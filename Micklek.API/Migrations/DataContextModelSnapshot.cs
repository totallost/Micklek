﻿// <auto-generated />
using System;
using Micklek.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Micklek.API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.1-servicing-10028");

            modelBuilder.Entity("Micklek.API.Models.Item", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<string>("PhotoUrl");

                    b.Property<float>("Price");

                    b.HasKey("Id");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("Micklek.API.Models.OrderHeader", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<string>("ClientCell");

                    b.Property<string>("ClientEmail");

                    b.Property<string>("ClientFirstName");

                    b.Property<string>("ClientRemarks");

                    b.Property<string>("ClientSureName");

                    b.Property<DateTime>("DateCreation");

                    b.Property<DateTime>("DateTarget");

                    b.Property<int>("NumberOfItems");

                    b.Property<int>("StatusId");

                    b.Property<float>("TotalPrice");

                    b.HasKey("Id");

                    b.HasIndex("StatusId");

                    b.ToTable("OrderHeaders");
                });

            modelBuilder.Entity("Micklek.API.Models.OrderLine", b =>
                {
                    b.Property<int>("OrderHeaderId");

                    b.Property<int>("LineNumber");

                    b.Property<int>("Amount");

                    b.Property<int>("ItemId");

                    b.HasKey("OrderHeaderId", "LineNumber");

                    b.HasIndex("ItemId");

                    b.ToTable("OrderLines");
                });

            modelBuilder.Entity("Micklek.API.Models.Status", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.HasKey("Id");

                    b.ToTable("Statuses");
                });

            modelBuilder.Entity("Micklek.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Micklek.API.Models.Value", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Values");
                });

            modelBuilder.Entity("Micklek.API.Models.OrderHeader", b =>
                {
                    b.HasOne("Micklek.API.Models.Status", "Status")
                        .WithMany()
                        .HasForeignKey("StatusId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Micklek.API.Models.OrderLine", b =>
                {
                    b.HasOne("Micklek.API.Models.Item", "Item")
                        .WithMany()
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Micklek.API.Models.OrderHeader")
                        .WithMany("OrderLines")
                        .HasForeignKey("OrderHeaderId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
