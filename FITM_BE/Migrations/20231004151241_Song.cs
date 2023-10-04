using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FITM_BE.Migrations
{
    /// <inheritdoc />
    public partial class Song : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Songs_CreatedBy",
                table: "Songs");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Songs");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Songs");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "Songs");

            migrationBuilder.DropColumn(
                name: "ModifiedDate",
                table: "Songs");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Songs");

            migrationBuilder.RenameColumn(
                name: "LinkBeats",
                table: "Songs",
                newName: "LinkBeat");

            migrationBuilder.AddColumn<string>(
                name: "BackgroundImg",
                table: "Songs",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Songs_CreatedById",
                table: "Songs",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Songs_Name",
                table: "Songs",
                column: "Name");

            migrationBuilder.AddForeignKey(
                name: "FK_Songs_Members_CreatedById",
                table: "Songs",
                column: "CreatedById",
                principalTable: "Members",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Songs_Members_CreatedById",
                table: "Songs");

            migrationBuilder.DropIndex(
                name: "IX_Songs_CreatedById",
                table: "Songs");

            migrationBuilder.DropIndex(
                name: "IX_Songs_Name",
                table: "Songs");

            migrationBuilder.DropColumn(
                name: "BackgroundImg",
                table: "Songs");

            migrationBuilder.RenameColumn(
                name: "LinkBeat",
                table: "Songs",
                newName: "LinkBeats");

            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "Songs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Songs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "ModifiedBy",
                table: "Songs",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedDate",
                table: "Songs",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Songs",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Songs_CreatedBy",
                table: "Songs",
                column: "CreatedBy");
        }
    }
}
