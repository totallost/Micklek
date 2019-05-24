using Microsoft.EntityFrameworkCore.Migrations;

namespace Micklek.API.Migrations
{
    public partial class addingLinePriceToTableOrderLine : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "LinePrice",
                table: "OrderLines",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LinePrice",
                table: "OrderLines");
        }
    }
}
