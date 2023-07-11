using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace landingpagelemental.Controllers;

[ApiController]
[Route("api")]
public class ApiController : Controller
{
    [Route("send")]
    [HttpPost]
    public async Task<IActionResult> Index(dynamic body)
    {
        using var client = new HttpClient();
        var jsonContent = new StringContent(
            System.Text.Json.JsonSerializer.Serialize(body),
            Encoding.UTF8,
            "application/json"
        );
        var response = await client.PostAsync("https://payment-services.vercel.app/elemental", jsonContent);
        var responseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine(responseBody);
        return Json(responseBody);
    }
}