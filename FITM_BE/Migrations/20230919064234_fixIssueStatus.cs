using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FITM_BE.Migrations
{
    /// <inheritdoc />
    public partial class fixIssueStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_RequestEditInfo_Status",
                table: "RequestEditInfo");

            migrationBuilder.CreateIndex(
                name: "IX_RequestEditInfo_Status",
                table: "RequestEditInfo",
                column: "Status");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_RequestEditInfo_Status",
                table: "RequestEditInfo");

            migrationBuilder.CreateIndex(
                name: "IX_RequestEditInfo_Status",
                table: "RequestEditInfo",
                column: "Status",
                unique: true);
        }
    }
}
