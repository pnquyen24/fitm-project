using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FITM_BE.Migrations
{
    /// <inheritdoc />
    public partial class updateattendancepractical : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AttendancePracticals_PracticalSchedules_PracticalScheduleId",
                table: "AttendancePracticals");

            migrationBuilder.DropIndex(
                name: "IX_AttendancePracticals_PracticalId",
                table: "AttendancePracticals");

            migrationBuilder.DropColumn(
                name: "PracticalId",
                table: "AttendancePracticals");

            migrationBuilder.AlterColumn<int>(
                name: "PracticalScheduleId",
                table: "AttendancePracticals",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AttendancePracticals_PracticalSchedules_PracticalScheduleId",
                table: "AttendancePracticals",
                column: "PracticalScheduleId",
                principalTable: "PracticalSchedules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AttendancePracticals_PracticalSchedules_PracticalScheduleId",
                table: "AttendancePracticals");

            migrationBuilder.AlterColumn<int>(
                name: "PracticalScheduleId",
                table: "AttendancePracticals",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "PracticalId",
                table: "AttendancePracticals",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_AttendancePracticals_PracticalId",
                table: "AttendancePracticals",
                column: "PracticalId");

            migrationBuilder.AddForeignKey(
                name: "FK_AttendancePracticals_PracticalSchedules_PracticalScheduleId",
                table: "AttendancePracticals",
                column: "PracticalScheduleId",
                principalTable: "PracticalSchedules",
                principalColumn: "Id");
        }
    }
}
