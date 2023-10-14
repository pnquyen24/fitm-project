using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FITM_BE.Migrations
{
    /// <inheritdoc />
    public partial class AttendancePracticals : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AttendancePracticals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MemberId = table.Column<int>(type: "int", nullable: false),
                    PracticalId = table.Column<int>(type: "int", nullable: false),
                    PracticalScheduleId = table.Column<int>(type: "int", nullable: true),
                    Attendance = table.Column<bool>(type: "bit", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedById = table.Column<int>(type: "int", nullable: true),
                    ModifiedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttendancePracticals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AttendancePracticals_Members_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AttendancePracticals_Members_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Members",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AttendancePracticals_Members_ModifiedById",
                        column: x => x.ModifiedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AttendancePracticals_PracticalSchedules_PracticalScheduleId",
                        column: x => x.PracticalScheduleId,
                        principalTable: "PracticalSchedules",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AttendancePracticals_CreatedById",
                table: "AttendancePracticals",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_AttendancePracticals_MemberId",
                table: "AttendancePracticals",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_AttendancePracticals_ModifiedById",
                table: "AttendancePracticals",
                column: "ModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_AttendancePracticals_PracticalId",
                table: "AttendancePracticals",
                column: "PracticalId");

            migrationBuilder.CreateIndex(
                name: "IX_AttendancePracticals_PracticalScheduleId",
                table: "AttendancePracticals",
                column: "PracticalScheduleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AttendancePracticals");
        }
    }
}
