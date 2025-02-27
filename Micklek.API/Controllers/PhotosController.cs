﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Micklek.API.Data;
using Micklek.API.Dtos;
using Micklek.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Micklek.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        public IOrderRepository _repo { get; set; }
        public IOptions<CloudinarySettings> _cloudinaryConfig { get; set; }
        private Cloudinary _cloudinary { get; set; }
        public PhotosController(IOrderRepository repo, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _repo = repo;
            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddPhotoToItem([FromForm]int itemId, [FromForm]IFormFile photoForCreationDto)
        {
            var item = await _repo.GetItem(itemId);

            var file = photoForCreationDto;
            var uploadResults = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(960)
                                                             .Height(720)
                                                             .Crop("fill")
                                                             .Gravity("face"),
                        Folder = "Micklek"
                    };

                    uploadResults = _cloudinary.Upload(uploadParams);
                }
            }
            //delete the old photo of the Item from the cloud
            if (item.PhotoPublicName != null && item.PhotoPublicName != "")
            {
                var deleteParams = new DeletionParams(item.PhotoPublicName);
                var result = _cloudinary.Destroy(deleteParams);
            }

            item.PhotoUrl = uploadResults.Uri.ToString();
            item.PhotoPublicName = uploadResults.PublicId.ToString();

            if (await _repo.SaveAll())
            {
                return Ok(item.PhotoUrl);
            }
            else
            {
                // delete the photo from cloudinary in case failed to save to DB
                if (uploadResults.PublicId.Length == 0)
                {
                    var deleteParams = new DeletionParams(uploadResults.PublicId.ToString());
                    var result = _cloudinary.Destroy(deleteParams);
                }
            }
            return BadRequest("Could not add the photo");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemPhoto(int id)
        {
            var item = await _repo.GetItem(id);
            item.PhotoUrl = null;
            if (item.PhotoPublicName != null)
            {
                var deleteParams = new DeletionParams(item.PhotoPublicName);
                var result = _cloudinary.Destroy(deleteParams);
                item.PhotoPublicName = null;
            }
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return BadRequest("Could not delete the Photo");

        }
    }
}
