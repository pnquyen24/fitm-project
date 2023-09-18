namespace FITM_BE.Exceptions.UserException
{
    public class InvalidException : Exception
    {
        public InvalidException() : base("Invalid data") { }
        public InvalidException(string message) : base(message) { }
    }
}
