package com.sarthiacademy.org;

import android.content.Context;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.hardware.display.DisplayManager;
import android.view.Display;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;

import android.graphics.Bitmap;
import android.os.Environment;
import android.print.PrintManager;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Utils extends ReactContextBaseJavaModule {
    private Context context;
    private DisplayManager mDisplayManager;

    public Utils(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Utils";
    }

    public boolean isEmulator() {
        return Build.BRAND.startsWith("generic") || Build.DEVICE.startsWith("generic")
                || Build.FINGERPRINT.startsWith("generic") || Build.FINGERPRINT.startsWith("unknown")
                || Build.HARDWARE.contains("goldfish") || Build.HARDWARE.contains("ranchu")
                || Build.MODEL.contains("google_sdk") || Build.MODEL.contains("Emulator")
                || Build.MODEL.contains("Android SDK built for x86") || Build.PRODUCT.contains("sdk_google")
                || Build.PRODUCT.contains("google_sdk") || Build.PRODUCT.contains("sdk")
                || Build.PRODUCT.contains("sdk_x86") || Build.PRODUCT.contains("vbox86p")
                || Build.PRODUCT.contains("emulator") || Build.PRODUCT.contains("simulator")
                || Build.HOST.startsWith("Build") || Build.MANUFACTURER.contains("BlueStacks")
                || Build.MANUFACTURER.contains("Genymotion") || Build.MANUFACTURER.contains("CMDC");

        // Build.BOARD.contains("QC_Reference_Phone")
    }

    @ReactMethod
    public void isSimEmu(Callback errorCallback, Callback successCallback) {

        try {
            successCallback.invoke(isEmulator());
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }
}