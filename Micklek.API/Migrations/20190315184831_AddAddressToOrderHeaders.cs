using Microsoft.EntityFrameworkCore.Migrations;

namespace Micklek.API.Migrations
{
    public partial class AddAddressToOrderHeaders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "OrderHeaders",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "OrderHeaders");
        }
    }
}
