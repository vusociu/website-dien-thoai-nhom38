namespace WebApp.helpers
{
    public class Helper
    {
        public static string uploadFile(IFormFile? file)
        {
            if (file == null)
            {
                return "";
            }

            var uploadsFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(uploadsFolderPath))
            {
                Directory.CreateDirectory(uploadsFolderPath);
            }

            string avatar = Path.Combine(uploadsFolderPath, file.FileName);
            using (var stream = new FileStream(avatar, FileMode.Create))
            {
                file.CopyToAsync(stream);
            }
            return avatar.Replace("/app/wwwroot", "");
        }
    }
}
