namespace FITM_BE.Exceptions.UserException
{
    public class NotFoundException : Exception
    {
        public NotFoundException() : base("Resource not found") { }
        public NotFoundException(string message) : base(message) { }
    }
}
