using Microsoft.EntityFrameworkCore.Migrations;

namespace Micklek.API.Migrations
{
    public partial class addTableOrderHeaders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrderHeaders",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NumberOfItems = table.Column<int>(nullable: false),
                    TotalPrice = table.Column<float>(nullable: false),
                    ClientName = table.Column<string>(nullable: true),
                    ClientEmail = table.Column<string>(nullable: true),
                    ClientCell = table.Column<string>(nullable: true),
                    ClientRemarks = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderHeaders", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderHeaders");
        }
    }
}
