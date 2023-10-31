using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FITM_BE.Migrations
{
    /// <inheritdoc />
    public partial class iter2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "Songs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Author = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    LinkBeat = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    LinkSheet = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    BackgroundImg = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedById = table.Column<int>(type: "int", nullable: true),
                    ModifiedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Songs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Songs_Members_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Songs_Members_ModifiedById",
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
                name: "IX_PracticalSchedules_Date",
                table: "PracticalSchedules",
                column: "Date");

            migrationBuilder.CreateIndex(
                name: "IX_Songs_CreatedById",
                table: "Songs",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Songs_ModifiedById",
                table: "Songs",
                column: "ModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_Songs_Name",
                table: "Songs",
                column: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PracticalSchedules");

            migrationBuilder.DropTable(
                name: "Songs");
        }
    }
}
