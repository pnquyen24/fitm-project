using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FITM_BE.Migrations
{
    /// <inheritdoc />
    public partial class InstrumentReport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InstrumentReports");
        }
    }
}
