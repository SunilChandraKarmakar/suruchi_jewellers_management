using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SuruchiJewellersManagement.Api.Helpers;
using SuruchiJewellersManagement.Domain.RdlcReportModels.Order;
using System.Net.Http.Headers;
using System.Text;

namespace SuruchiJewellersManagement.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        public ReportController(IWebHostEnvironment env) => _env = env;

        [HttpGet]
        public async Task<IActionResult> DownloadOrderReport(string type = "html")
        {
            byte[] reportBytes;

            var jsonSerializerSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                NullValueHandling = NullValueHandling.Ignore,
            };

            // Get order report
            var getOrderReport = GetOrderReport();

            // Get order details report
            var getPrderDetailsReports = GetOrderDetailsReports()!;

            var mapOrderDataSet = JsonConvert.SerializeObject(getOrderReport, jsonSerializerSettings);            
            var mapOrderDetailsDataSet = JsonConvert.SerializeObject(getPrderDetailsReports, 
                jsonSerializerSettings);

            var reportPath = Path.Combine(_env.WebRootPath, "Reports", $"InvoiceReport.rdlc");

            using (var fileStream = new FileStream(reportPath, FileMode.Open, FileAccess.Read))
            {
                using (var memoryStream = new MemoryStream())
                {
                    await fileStream.CopyToAsync(memoryStream);
                    reportBytes = memoryStream.ToArray();
                }
            }

            var reportHelper = new ReportGenaratorHelper("https://report.vonome.com/", "api/Report");
            var request = new ReportGenaratorHelper.RequestModel();

            request.ReportFile = reportBytes;
            request.RenderFormat = GetRenderFormat(type);
            request.Extension = type;
            request.MimeType = GetMimeType(type);

            request.AddDataSource("Order", mapOrderDataSet);
            request.AddDataSource("OrderDetails", mapOrderDetailsDataSet);

            // Render the report
            byte[] reportOutput = await reportHelper.GetReport(request);

            var serialNumberToDownloadFile = ConvertBengaliToNumeric(getOrderReport.SerialNumber);
            var fileName = $"{serialNumberToDownloadFile}.{type}";

            Response.Headers.Add("Content-Disposition", new ContentDispositionHeaderValue("attachment")
            {
                FileName = fileName
            }.ToString());

            return File(reportOutput, GetMimeType(type));
        }

        private OrderReportModel GetOrderReport()
        {
            var orderReport = new OrderReportModel
            {
                SerialNumber = "১০০১",
                Date = "১০/২৯/২০০৪",
                CustomerName = "সুনীল কর্মকার",
                NickName = "সুনীল",
                Vori = "১",
                Ana = "২",
                Roti = "৩",
                ProductOptionName = "পাথর সহ",
                Amount = "২০০০০",
                AmountInWord = "বিশ হাজার টাকা মাত্র"
            };

            return orderReport;
        }

        private List<OrderDetailsReportModel> GetOrderDetailsReports()
        {
            var orderDetailsReports = new List<OrderDetailsReportModel>
            {
                new OrderDetailsReportModel 
                { 
                    ProductTypeName = "22K", 
                    ProductName = "চেইন", 
                    ProductQuantityName = "দুইটা",
                    Optional = " "
                },
                new OrderDetailsReportModel
                {
                    ProductTypeName = "22K",
                    ProductName = "কানের",
                    ProductQuantityName = "একজোড়া",
                    Optional = "ভাঙ্গা আছে"
                },
                new OrderDetailsReportModel
                {
                    ProductTypeName = "D",
                    ProductName = "কানের",
                    ProductQuantityName = "দুইজোড়া",
                    Optional = "ভাঙ্গা আছে"
                }
            };

            return orderDetailsReports!;
        }

        private string GetMimeType(string extension)
        {
            return extension.ToLower() switch
            {
                "pdf" => "application/pdf",
                "html" => "text/html",
                "docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                _ => "application/octet-stream" // Default to a binary stream for unknown file types
            };
        }

        private string GetRenderFormat(string extension)
        {
            return extension.ToLower() switch
            {
                "pdf" => "PDF",
                "html" => "HTML5",
                "docx" => "WORDOPENXML",
                "xlsx" => "EXCELOPENXML",
                _ => "HTML5" // Default to a binary stream for unknown file types
            };
        }

        static string ConvertBengaliToNumeric(string bengaliNumber)
        {
            // Define a mapping of Bengali digits to Arabic digits
            var bengaliToNumericMap = new char[] { '০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯' };

            // Use StringBuilder to construct the numeric result
            var numericResult = new StringBuilder();

            foreach (char c in bengaliNumber)
            {
                // Check if character is a Bengali digit
                int index = Array.IndexOf(bengaliToNumericMap, c);
                if (index != -1)
                {
                    numericResult.Append(index); // Append the corresponding Arabic digit
                }
                else
                {
                    numericResult.Append(c); // Append any other characters as is
                }
            }

            return numericResult.ToString();
        }
    }
}