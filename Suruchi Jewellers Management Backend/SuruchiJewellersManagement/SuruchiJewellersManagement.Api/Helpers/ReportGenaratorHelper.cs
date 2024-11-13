using Newtonsoft.Json;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace SuruchiJewellersManagement.Api.Helpers
{
    public class ReportGenaratorHelper
    {
        public ReportGenaratorHelper(string baseUrl, string endpoint)
        {
            BaseUrl = new Uri(baseUrl);
            Endpoint = endpoint;
        }

        public Uri BaseUrl { get; set; }
        public string Endpoint { get; set; }

        public async Task<byte[]> GetReport(RequestModel request)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls13;

            using var _httpClient = new HttpClient();
            _httpClient.BaseAddress = BaseUrl;
            _httpClient.DefaultRequestHeaders.Accept.Clear();
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            // Serialize the requestModel to JSON
            var jsonContent = JsonConvert.SerializeObject(request);
            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            var requestMessage = new HttpRequestMessage(HttpMethod.Post, Endpoint)
            {
                // Serialize the request model to JSON
                Content = JsonContent.Create(request, options: new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase // Adjust this based on your API expectations
                })
            };

            // Send the POST request
            var response = await _httpClient.SendAsync(requestMessage);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsByteArrayAsync();
        }

        public class RequestModel
        {
            private List<ReportDataSource> _reportDataSource = new List<ReportDataSource>();
            private List<ReportParameter> _reportParameters = new List<ReportParameter>();

            public byte[] ReportFile { get; set; }
            public List<ReportDataSource> ReportDataSource
            {
                get => _reportDataSource;
                private set => _reportDataSource = value;
            }

            public List<ReportParameter> ReportParameters
            {
                get => _reportParameters;
                private set => _reportParameters = value;
            }

            public string RenderFormat { get; set; }
            public string Extension { get; set; }
            public string MimeType { get; set; }

            public void AddDataSource(string name, string value)
            {
                this._reportDataSource.Add(new ReportDataSource(name, value));
            }

            public void AddParameter(string name, string value)
            {
                this._reportParameters.Add(new ReportParameter(name, value));
            }
        }

        public sealed class ReportDataSource
        {
            public ReportDataSource(string name, string value)
            {
                Name = name;
                Value = value;
            }

            public string Name { get; set; }
            public string Value { get; set; }
        }


        public class ReportParameter
        {
            public ReportParameter(string name, string value)
            {
                Name = name;
                Value = value;
            }

            public string Name { get; set; }
            public string Value { get; set; }
        }
    }
}