using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FITM_BE.Migrations
{
    /// <inheritdoc />
    public partial class changeDataPerformance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Members_PerformanceSchedules_PerformanceScheduleId",
                table: "Members");

            migrationBuilder.DropForeignKey(
                name: "FK_Songs_PerformanceSchedules_PerformanceScheduleId",
                table: "Songs");

            migrationBuilder.DropIndex(
                name: "IX_Songs_PerformanceScheduleId",
                table: "Songs");

            migrationBuilder.DropIndex(
                name: "IX_Members_PerformanceScheduleId",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "PerformanceScheduleId",
                table: "Songs");

            migrationBuilder.DropColumn(
                name: "PerformanceScheduleId",
                table: "Members");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "PerformanceSchedules",
                type: "int",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PerformanceScheduleId",
                table: "Songs",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "Status",
                table: "PerformanceSchedules",
                type: "bit",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "PerformanceScheduleId",
                table: "Members",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Songs_PerformanceScheduleId",
                table: "Songs",
                column: "PerformanceScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_Members_PerformanceScheduleId",
                table: "Members",
                column: "PerformanceScheduleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Members_PerformanceSchedules_PerformanceScheduleId",
                table: "Members",
                column: "PerformanceScheduleId",
                principalTable: "PerformanceSchedules",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Songs_PerformanceSchedules_PerformanceScheduleId",
                table: "Songs",
                column: "PerformanceScheduleId",
                principalTable: "PerformanceSchedules",
                principalColumn: "Id");
        }
    }
}
