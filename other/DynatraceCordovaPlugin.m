#import "DynatraceCordovaPlugin.h"
#import <Cordova/CDVPlugin.h>
@import Dynatrace;


@implementation DynatraceCordovaPlugin

- (void)endVisit:(CDVInvokedUrlCommand*)command{
    DTX_StatusCode code = [Dynatrace endVisit];

    CDVPluginResult* result;

    if(code == DTX_CaptureOn){
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                    messageAsString:@(code).stringValue];
    }else{
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                    messageAsString:@(code).stringValue];
    }
                              
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}


- (void) getUserPrivacyOptions:(CDVInvokedUrlCommand*)command
{
    NSMutableDictionary *privacyDict = [[NSMutableDictionary alloc] init];
    
    id<DTXUserPrivacyOptions> privacyConfig = [Dynatrace userPrivacyOptions];
        
    privacyDict[@"dataCollectionLevel"] = [NSNumber numberWithInt:privacyConfig.dataCollectionLevel];
    privacyDict[@"crashReportingOptedIn"] = [NSNumber numberWithBool: privacyConfig.crashReportingOptedIn];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:privacyDict];
 
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) applyUserPrivacyOptions:(CDVInvokedUrlCommand*)command
{   
    CDVPluginResult* pluginResult;

    if ([command.arguments objectAtIndex:0]) {
        id<DTXUserPrivacyOptions> privacyConfig = [Dynatrace userPrivacyOptions];
        privacyConfig.dataCollectionLevel = [[[command.arguments objectAtIndex:0] valueForKey:@"dataCollectionLevel"] intValue];
        privacyConfig.crashReportingOptedIn = [[command.arguments objectAtIndex:0] valueForKey:@"crashReportingOptedIn"];
        
        [Dynatrace applyUserPrivacyOptions:privacyConfig completion:^(BOOL successful) {
            // do nothing with callback
        }];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@("Privacy settings updated!")];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end