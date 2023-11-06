using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FITM_BE.Migrations
{
    /// <inheritdoc />
    public partial class updateinstrument : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SortName",
                table: "InstrumentTypes",
                newName: "ShortName");

            migrationBuilder.RenameIndex(
                name: "IX_InstrumentTypes_SortName",
                table: "InstrumentTypes",
                newName: "IX_InstrumentTypes_ShortName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShortName",
                table: "InstrumentTypes",
                newName: "SortName");

            migrationBuilder.RenameIndex(
                name: "IX_InstrumentTypes_ShortName",
                table: "InstrumentTypes",
                newName: "IX_InstrumentTypes_SortName");
        }
    }
}
