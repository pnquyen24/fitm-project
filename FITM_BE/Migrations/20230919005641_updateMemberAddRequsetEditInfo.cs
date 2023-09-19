using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FITM_BE.Migrations
{
    /// <inheritdoc />
    public partial class updateMemberAddRequsetEditInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Members_Members_CreatedById",
                table: "Members");

            migrationBuilder.DropForeignKey(
                name: "FK_Members_Members_ModifiedById",
                table: "Members");

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "Members",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Members",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedTime",
                table: "Members",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<int>(
                name: "ModifiedById",
                table: "Members",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Members",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Members",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedTime",
                table: "Members",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<int>(
                name: "CreatedById",
                table: "Members",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "Avatar",
                table: "Members",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BankName",
                table: "Members",
                type: "nvarchar(15)",
                maxLength: 15,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BankNumber",
                table: "Members",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DOB",
                table: "Members",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "Members",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Members",
                type: "nvarchar(11)",
                maxLength: 11,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Members",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "StudentID",
                table: "Members",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "RequestEditInfo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentID = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    DOB = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: true),
                    BankName = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    BankNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedById = table.Column<int>(type: "int", nullable: true),
                    ModifiedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequestEditInfo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RequestEditInfo_Members_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RequestEditInfo_Members_ModifiedById",
                        column: x => x.ModifiedById,
                        principalTable: "Members",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Members_StudentID",
                table: "Members",
                column: "StudentID");

            migrationBuilder.CreateIndex(
                name: "IX_RequestEditInfo_CreatedById",
                table: "RequestEditInfo",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_RequestEditInfo_ModifiedById",
                table: "RequestEditInfo",
                column: "ModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_RequestEditInfo_Status",
                table: "RequestEditInfo",
                column: "Status",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Members_Members_CreatedById",
                table: "Members",
                column: "CreatedById",
                principalTable: "Members",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Members_Members_ModifiedById",
                table: "Members",
                column: "ModifiedById",
                principalTable: "Members",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Members_Members_CreatedById",
                table: "Members");

            migrationBuilder.DropForeignKey(
                name: "FK_Members_Members_ModifiedById",
                table: "Members");

            migrationBuilder.DropTable(
                name: "RequestEditInfo");

            migrationBuilder.DropIndex(
                name: "IX_Members_StudentID",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "Avatar",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "BankName",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "BankNumber",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "DOB",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "StudentID",
                table: "Members");

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "Members",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Members",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedTime",
                table: "Members",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ModifiedById",
                table: "Members",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Members",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Members",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(30)",
                oldMaxLength: 30);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedTime",
                table: "Members",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CreatedById",
                table: "Members",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Members_Members_CreatedById",
                table: "Members",
                column: "CreatedById",
                principalTable: "Members",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Members_Members_ModifiedById",
                table: "Members",
                column: "ModifiedById",
                principalTable: "Members",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
