using Microsoft.EntityFrameworkCore.Migrations;

namespace Micklek.API.Migrations
{
    public partial class addRowPhotoPublivNameToItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhotoPublicName",
                table: "Items",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoPublicName",
                table: "Items");
        }
    }
}
