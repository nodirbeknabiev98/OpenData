using Microsoft.EntityFrameworkCore.Migrations;

namespace OpenDataAPI.Migrations
{
    public partial class ChangingServerModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Servers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Servers",
                type: "text",
                nullable: true);
        }
    }
}
