package com.dynatrace.cordova.plugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import com.dynatrace.android.agent.Dynatrace;
import com.dynatrace.android.agent.conf.DataCollectionLevel;
import com.dynatrace.android.agent.conf.UserPrivacyOptions;

public class DynatraceCordovaPlugin extends CordovaPlugin {

  public static final String ACTION_UEM_END_SESSION = "endVisit";
  public static final String ACTION_UEM_GET_USERPRIVACYOPTIONS = "getUserPrivacyOptions";
  public static final String ACTION_UEM_APPLY_USERPRIVACYOPTIONS = "applyUserPrivacyOptions";

  @Override
  public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    super.initialize(cordova, webView);
  }

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    try {
      if (action.equals(ACTION_UEM_END_SESSION)) {
        Dynatrace.endVisit();
        callbackContext.success();
        return true;
      } else if (action.equals(ACTION_UEM_GET_USERPRIVACYOPTIONS)) {
        UserPrivacyOptions options = Dynatrace.getUserPrivacyOptions();

        JSONObject optionsJsonObj = new JSONObject();
        optionsJsonObj.put("dataCollectionLevel", options.getDataCollectionLevel().ordinal());
        optionsJsonObj.put("crashReportingOptedIn", Boolean.valueOf(options.isCrashReportingOptedIn()));

        callbackContext.success(optionsJsonObj);
        return true;
      } else if (action.equals(ACTION_UEM_APPLY_USERPRIVACYOPTIONS)) {
        UserPrivacyOptions.Builder optionsBuilder = UserPrivacyOptions.builder();
        optionsBuilder.withDataCollectionLevel(DataCollectionLevel.values()[(args.getJSONObject(0).getInt("dataCollectionLevel"))]);
        optionsBuilder.withCrashReportingOptedIn(args.getJSONObject(0).getBoolean("crashReportingOptedIn"));

        Dynatrace.applyUserPrivacyOptions(optionsBuilder.build());
        callbackContext.success("Privacy settings updated!");

        return true;
      }
    } catch(Exception e) {
      System.err.println("Exception: " + e.getMessage());
      callbackContext.error(e.getMessage());
      return false;
    }
    return false;
  }
}