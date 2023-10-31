﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FITM_BE.Migrations
{
    /// <inheritdoc />
    public partial class Iter3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Incomes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Amount = table.Column<long>(type: "bigint", nullable: false),
                    BillCode = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    FinanceStatus = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedById = table.Column<int>(type: "int", nullable: true),
                    ModifiedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Incomes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Incomes_Members_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Incomes_Members_ModifiedById",
                        column: x => x.ModifiedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "InstrumentReports",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InstrumentID = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    MemberID = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Desciption = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedById = table.Column<int>(type: "int", nullable: true),
                    ModifiedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InstrumentReports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InstrumentReports_Members_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_InstrumentReports_Members_ModifiedById",
                        column: x => x.ModifiedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "InstrumentTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SortName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedById = table.Column<int>(type: "int", nullable: true),
                    ModifiedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InstrumentTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InstrumentTypes_Members_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_InstrumentTypes_Members_ModifiedById",
                        column: x => x.ModifiedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Outcomes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Amount = table.Column<long>(type: "bigint", nullable: false),
                    BillCode = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    FinanceStatus = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedById = table.Column<int>(type: "int", nullable: true),
                    ModifiedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Outcomes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Outcomes_Members_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Outcomes_Members_ModifiedById",
                        column: x => x.ModifiedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                });

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
                    Status = table.Column<int>(type: "int", nullable: false),
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
                name: "PracticalSchedules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StartTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    Room = table.Column<int>(type: "int", maxLength: 3, nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedById = table.Column<int>(type: "int", nullable: true),
                    ModifiedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "Instruments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TypeId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedById = table.Column<int>(type: "int", nullable: true),
                    ModifiedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Instruments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Instruments_InstrumentTypes_TypeId",
                        column: x => x.TypeId,
                        principalTable: "InstrumentTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Instruments_Members_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Instruments_Members_ModifiedById",
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

            migrationBuilder.CreateTable(
                name: "PracticalDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MemberId = table.Column<int>(type: "int", nullable: false),
                    PracticalScheduleId = table.Column<int>(type: "int", nullable: false),
                    Attendance = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedById = table.Column<int>(type: "int", nullable: true),
                    ModifiedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PracticalDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PracticalDetails_Members_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PracticalDetails_Members_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Members",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PracticalDetails_Members_ModifiedById",
                        column: x => x.ModifiedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PracticalDetails_PracticalSchedules_PracticalScheduleId",
                        column: x => x.PracticalScheduleId,
                        principalTable: "PracticalSchedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Incomes_CreatedById",
                table: "Incomes",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Incomes_ModifiedById",
                table: "Incomes",
                column: "ModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_Incomes_Title",
                table: "Incomes",
                column: "Title");

            migrationBuilder.CreateIndex(
                name: "IX_InstrumentReports_CreatedById",
                table: "InstrumentReports",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_InstrumentReports_MemberID",
                table: "InstrumentReports",
                column: "MemberID");

            migrationBuilder.CreateIndex(
                name: "IX_InstrumentReports_ModifiedById",
                table: "InstrumentReports",
                column: "ModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_Instruments_CreatedById",
                table: "Instruments",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Instruments_ModifiedById",
                table: "Instruments",
                column: "ModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_Instruments_TypeId",
                table: "Instruments",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_InstrumentTypes_CreatedById",
                table: "InstrumentTypes",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_InstrumentTypes_ModifiedById",
                table: "InstrumentTypes",
                column: "ModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_InstrumentTypes_SortName",
                table: "InstrumentTypes",
                column: "SortName");

            migrationBuilder.CreateIndex(
                name: "IX_Outcomes_CreatedById",
                table: "Outcomes",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Outcomes_ModifiedById",
                table: "Outcomes",
                column: "ModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_Outcomes_Title",
                table: "Outcomes",
                column: "Title");

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

            migrationBuilder.CreateIndex(
                name: "IX_PracticalDetails_CreatedById",
                table: "PracticalDetails",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_PracticalDetails_MemberId",
                table: "PracticalDetails",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_PracticalDetails_ModifiedById",
                table: "PracticalDetails",
                column: "ModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_PracticalDetails_PracticalScheduleId",
                table: "PracticalDetails",
                column: "PracticalScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_PracticalSchedules_CreatedById",
                table: "PracticalSchedules",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_PracticalSchedules_Date",
                table: "PracticalSchedules",
                column: "Date");

            migrationBuilder.CreateIndex(
                name: "IX_PracticalSchedules_ModifiedById",
                table: "PracticalSchedules",
                column: "ModifiedById");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Incomes");

            migrationBuilder.DropTable(
                name: "InstrumentReports");

            migrationBuilder.DropTable(
                name: "Instruments");

            migrationBuilder.DropTable(
                name: "Outcomes");

            migrationBuilder.DropTable(
                name: "PerformanceMembers");

            migrationBuilder.DropTable(
                name: "PerformanceSongs");

            migrationBuilder.DropTable(
                name: "PracticalDetails");

            migrationBuilder.DropTable(
                name: "InstrumentTypes");

            migrationBuilder.DropTable(
                name: "PerformanceSchedules");

            migrationBuilder.DropTable(
                name: "PracticalSchedules");
        }
    }
}
