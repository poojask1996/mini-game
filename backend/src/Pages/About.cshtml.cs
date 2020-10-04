﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Backend.Pages {
    public class AboutModel : PageModel {
        private readonly ILogger<AboutModel> _logger;

        public AboutModel(ILogger<AboutModel> logger) {
            _logger = logger;
        }

        public void OnGet() {
        }
    }
}
