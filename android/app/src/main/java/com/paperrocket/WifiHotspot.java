package com.paperrocket;
import android.content.Context;
import android.net.wifi.WifiManager;
import android.net.wifi.WifiManager.LocalOnlyHotspotCallback;
import android.net.wifi.WifiManager.LocalOnlyHotspotReservation;
import android.net.wifi.WifiConfiguration;
import android.os.Handler;
import android.util.Log;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;


public class WifiHotspot extends ReactContextBaseJavaModule{
    private LocalOnlyHotspotReservation mReservation;

    public WifiHotspot(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "WifiHotspot";
    }

    @ReactMethod
    public void create(String ssid, String password, final Callback callback) {
        WifiConfiguration config = new WifiConfiguration();
        config.SSID = "\"" + ssid + "\"";
        config.preSharedKey = "\"" + password + "\"";
        config.allowedAuthAlgorithms.set(WifiConfiguration.AuthAlgorithm.OPEN);
        config.allowedProtocols.set(WifiConfiguration.Protocol.RSN);

        WifiManager manager = (WifiManager) getReactApplicationContext()
                .getApplicationContext().getSystemService(Context.WIFI_SERVICE);

        manager.startLocalOnlyHotspot(new LocalOnlyHotspotCallback() {
            @Override
            public void onStarted(LocalOnlyHotspotReservation reservation) {
                super.onStarted(reservation);
                callback.invoke("Hotspot started successfully");
                mReservation = reservation;
            }

            @Override
            public void onStopped() {
                super.onStopped();
                Log.i("hotspot", "Hotspot stopped");
            }

            @Override
            public void onFailed(int reason) {
                super.onFailed(reason);
                Log.i("hotspot", "Hotspot failed with reason, " + reason);
            }
        }, new Handler());
    }

    public void stop(Callback callback) {
        if(mReservation != null) {
            mReservation.close();
            callback.invoke("Hotspot closed");
        }
        else callback.invoke("Reservation is null");
    }
}
