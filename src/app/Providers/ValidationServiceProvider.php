<?php

namespace App\Providers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class ValidationServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot(): void
    {
        validator::extend('phone', function ($attribute, $value, $parameters, $validator) {
            return preg_match('/^0[0-9]{9,10}\z/', $value);
        });
    }
}
