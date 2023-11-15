#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["FITM_BE.csproj", "."]
RUN dotnet restore "./FITM_BE.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "FITM_BE.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FITM_BE.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS="https://+:443;http://+:80"
ENTRYPOINT ["dotnet", "FITM_BE.dll"]