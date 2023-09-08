using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class refactorOrderTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ItemOrdered_ProductId",
                table: "OrderItem",
                newName: "ProductOrdered_ProductId");

            migrationBuilder.RenameColumn(
                name: "ItemOrdered_PictureUrl",
                table: "OrderItem",
                newName: "ProductOrdered_PictureUrl");

            migrationBuilder.RenameColumn(
                name: "ItemOrdered_Name",
                table: "OrderItem",
                newName: "ProductOrdered_Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProductOrdered_ProductId",
                table: "OrderItem",
                newName: "ItemOrdered_ProductId");

            migrationBuilder.RenameColumn(
                name: "ProductOrdered_PictureUrl",
                table: "OrderItem",
                newName: "ItemOrdered_PictureUrl");

            migrationBuilder.RenameColumn(
                name: "ProductOrdered_Name",
                table: "OrderItem",
                newName: "ItemOrdered_Name");
        }
    }
}
