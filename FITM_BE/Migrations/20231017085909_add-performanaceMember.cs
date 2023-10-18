using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FITM_BE.Migrations
{
    /// <inheritdoc />
    public partial class addperformanaceMember : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PracticalSchedules");

            migrationBuilder.AddColumn<int>(
                name: "PerformanceScheduleId",
                table: "Songs",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PerformanceScheduleId",
                table: "Members",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PerformanceSchedules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Place = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Time = table.Column<TimeSpan>(type: "time", nullable: false),
                    BackgroundImg = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Status = table.Column<bool>(type: "bit", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedById = table.Column<int>(type: "int", nullable: true),
                    ModifiedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerformanceSchedules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PerformanceSchedules_Members_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PerformanceSchedules_Members_ModifiedById",
                        column: x => x.ModifiedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PerformanceMembers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PerformanceId = table.Column<int>(type: "int", nullable: false),
                    MemberId = table.Column<int>(type: "int", nullable: false),
                    AttendanceStatus = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedById = table.Column<int>(type: "int", nullable: true),
                    ModifiedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerformanceMembers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PerformanceMembers_Members_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PerformanceMembers_Members_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Members",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PerformanceMembers_Members_ModifiedById",
                        column: x => x.ModifiedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PerformanceMembers_PerformanceSchedules_PerformanceId",
                        column: x => x.PerformanceId,
                        principalTable: "PerformanceSchedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PerformanceSongs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PerformanceId = table.Column<int>(type: "int", nullable: false),
                    SongId = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedById = table.Column<int>(type: "int", nullable: true),
                    ModifiedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerformanceSongs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PerformanceSongs_Members_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PerformanceSongs_Members_ModifiedById",
                        column: x => x.ModifiedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PerformanceSongs_PerformanceSchedules_PerformanceId",
                        column: x => x.PerformanceId,
                        principalTable: "PerformanceSchedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PerformanceSongs_Songs_SongId",
                        column: x => x.SongId,
                        principalTable: "Songs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Songs_PerformanceScheduleId",
                table: "Songs",
                column: "PerformanceScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_Members_PerformanceScheduleId",
                table: "Members",
                column: "PerformanceScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceMembers_CreatedById",
                table: "PerformanceMembers",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceMembers_MemberId",
                table: "PerformanceMembers",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceMembers_ModifiedById",
                table: "PerformanceMembers",
                column: "ModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceMembers_PerformanceId",
                table: "PerformanceMembers",
                column: "PerformanceId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceSchedules_CreatedById",
                table: "PerformanceSchedules",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceSchedules_ModifiedById",
                table: "PerformanceSchedules",
                column: "ModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceSongs_CreatedById",
                table: "PerformanceSongs",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceSongs_ModifiedById",
                table: "PerformanceSongs",
                column: "ModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceSongs_PerformanceId",
                table: "PerformanceSongs",
                column: "PerformanceId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceSongs_SongId",
                table: "PerformanceSongs",
                column: "SongId");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Members_PerformanceSchedules_PerformanceScheduleId",
                table: "Members");

            migrationBuilder.DropForeignKey(
                name: "FK_Songs_PerformanceSchedules_PerformanceScheduleId",
                table: "Songs");

            migrationBuilder.DropTable(
                name: "PerformanceMembers");

            migrationBuilder.DropTable(
                name: "PerformanceSongs");

            migrationBuilder.DropTable(
                name: "PerformanceSchedules");

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

            migrationBuilder.CreateTable(
                name: "PracticalSchedules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedById = table.Column<int>(type: "int", nullable: true),
                    ModifiedById = table.Column<int>(type: "int", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    ModifiedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Room = table.Column<int>(type: "int", maxLength: 3, nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PracticalSchedules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PracticalSchedules_Members_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PracticalSchedules_Members_ModifiedById",
                        column: x => x.ModifiedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PracticalSchedules_CreatedById",
                table: "PracticalSchedules",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_PracticalSchedules_ModifiedById",
                table: "PracticalSchedules",
                column: "ModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_PracticalSchedules_StartDate",
                table: "PracticalSchedules",
                column: "StartDate");
        }
    }
}
