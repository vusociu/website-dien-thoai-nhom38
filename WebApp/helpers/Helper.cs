namespace WebApp.helpers
{
    public class Helper
    {
        public static string uploadFile(IFormFile? file)
        {
            Random r = new Random();
            if (file == null)
            {
                return "";
            }

            var uploadsFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(uploadsFolderPath))
            {
                Directory.CreateDirectory(uploadsFolderPath);
            }

            string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(file.FileName);
            string fileExtension = Path.GetExtension(file.FileName);
            string uniqueFileName = string.Concat(fileNameWithoutExtension, "_", r.NextInt64(1, 1000000), fileExtension);

            string avatar = Path.Combine(uploadsFolderPath, uniqueFileName);
            using (var stream = new FileStream(avatar, FileMode.Create))
            {
                file.CopyToAsync(stream);
            }
            return avatar.Replace("/app/wwwroot", "");
        }
    }
}
