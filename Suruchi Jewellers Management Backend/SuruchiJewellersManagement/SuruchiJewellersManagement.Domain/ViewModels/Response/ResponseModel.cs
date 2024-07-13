namespace SuruchiJewellersManagement.Domain.ViewModels.Response
{
    public class ResponseModel
    {
        public ResponseModel(int code, string message, Object? response)
        {
            Code = code;
            Message = message;
            Response = response;
        }

        public int Code { get; set; }
        public string Message { get; set; }
        public object? Response { get; set; }
    }
}