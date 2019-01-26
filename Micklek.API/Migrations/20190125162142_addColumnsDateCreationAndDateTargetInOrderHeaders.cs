using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Micklek.API.Migrations
{
    public partial class addColumnsDateCreationAndDateTargetInOrderHeaders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreation",
                table: "OrderHeaders",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DateTarget",
                table: "OrderHeaders",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateCreation",
                table: "OrderHeaders");

            migrationBuilder.DropColumn(
                name: "DateTarget",
                table: "OrderHeaders");
        }
    }
}
