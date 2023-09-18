namespace FITM_BE.Exceptions.SystemException
{
    public class SystemException : Exception
    {
        public SystemException() : base("Something wrong!") { }
        public SystemException(string message) : base(message) { }
    }
}
