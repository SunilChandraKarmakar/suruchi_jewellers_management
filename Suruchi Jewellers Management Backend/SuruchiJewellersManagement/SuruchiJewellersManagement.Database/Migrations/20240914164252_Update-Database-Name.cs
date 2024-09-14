using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SuruchiJewellersManagement.Database.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDatabaseName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "OrderNumber",
                table: "Orders",
                type: "nvarchar(64)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar");

            migrationBuilder.AlterColumn<string>(
                name: "Amount",
                table: "Orders",
                type: "nvarchar(64)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "OrderNumber",
                table: "Orders",
                type: "nvarchar",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(64)");

            migrationBuilder.AlterColumn<string>(
                name: "Amount",
                table: "Orders",
                type: "nvarchar",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(64)");
        }
    }
}
