/**
 * All the cookies which are necessary for linking a native web request
 */
interface DynatraceNativeRequestCookies {
    dtAdk: string;
}

/**
 * All the headers which are necessary for linking a native web request
 */
interface DynatraceNativeRequestHeaders {
    "x-dtpc": string;
    "x-dynatrace": string;
    "x-dtreferer": string;
}

interface MobileFirstNetworkInterceptor {
    /**
     * Is the interceptor enabled or not
     */
    isInterceptorEnabled(): boolean;

    /**
     * Enables the interceptor which wraps the WLResourceRequest
     * @param serverUrl ServerURL for the IBM Mobile First server. 
     */
    enableInterceptor(serverUrl: string): void;

    /**
     * Disables the interceptor again
     */
    disableInterceptor(): void;
}

interface NativeNetworkInterceptorUtils {
    /**
     * Returns all the needed headers for identifying the request in the web application part
     * @param actionId ID of the action that this request should be linked with
     */
    getHeadersForNativeRequest(actionId: number): { [key: string]: string; };

    /**
     * This creates an action for the XHR request. The important thing to note here is that the JSAgent will try to 
     * find a user action which happen right before the XHR. This means in the event of a button click the 
     * button click will automatically be detected and be used for the XHR. If there was no user input right 
     * before the action the function will create an action with the "actionNameFallback" name.
     * @param url URL which was called in the XHR
     * @param webRequestFrameworkName e.g. MobileFirst
     * @param actionNameFallback Fallback for an Action name if a user input could not be detected
     */
    enterNativeRequestAction(url: string, webRequestFrameworkName: string, actionNameFallback?: string): number

    /**
     * Leaves the action
     * @param actionId Id of the action
     */
    leaveNativeRequestAction(actionId: number): void
}

/**
 * Enum that represents the different privacy levels.
 */
declare const enum DataCollectionLevel {
    /**
     * @member {DataCollectionLevel} Off  
     * @description Native Agent doesn't capture any monitoring data.
     */
    Off,

    /**
     * @member {DataCollectionLevel} Performance
     * @description Native Agent captures only anonymous performance data.
     */
    Performance,

    /**
     * @member {DataCollectionLevel} UserBehavior
     * @description Native Agent captures both performance and user data.
     */
    UserBehavior,
}

interface DynatraceMobile {
    /**
    * Sends an endSession signal to the server, which will cause the session to end without waiting for a timeout
    * @param success callback used when the endSession is successful 
    * @param error callback used when the endSession is not successful 
    * @returns Status from if the endVisit call was successful or not
    */
    endVisit(success: any, error: any): void;

    /**
     * Returns an interceptor which helps you to monitor requests to the Mobile First environment. They are wrapped
     * around an action or connected to the latest user input that happened. 
     */
    getMobileFirstNetworkInterceptor(): MobileFirstNetworkInterceptor;

    /**
     * Returns a utils which helps you to monitor native requests. With the help of those functions you can
     * mark them as normal web requests and let them be linked with the web application user actions.
     */
    getNativeNetworkInterceptorUtils(): NativeNetworkInterceptorUtils;

    /**
     * Get the current user privacy options including data collection level
     * (Off, Performance, UserBehavior) and if crash reporting is enabled
     * @param success callback used when retrieving UserPrivacyOptions is successful 
     * @param error callback used when retrieving UserPrivacyOptions is not successful 
     * @returns Current user privacy options for the mobile session
     */
    getUserPrivacyOptions(success: (userPrivacyOptions: UserPrivacyOptions) => any, error: any): void;

    /**
     * Set the data collection level (Off, Performance, UserBehavior)
     * and turns on or off crash reporting 
     * @param dataCollectionLevel data collection level which specifies the amount of data that is reported
     * @param crashReportingOptedIn opt-in value for crash reporting 
     * @param success callback used when applying UserPrivacyOptions is successful 
     * @param error callback used when applying UserPrivacyOptions is not successful 
     * @returns true is applying the UserPrivacyOptions was successful and false if not
     */
    applyUserPrivacyOptions(dataCollectionLevel: DataCollectionLevel, crashReportingOptedIn: boolean, success: any, error: any): void;
}

interface UserPrivacyOptions {
    /**
     * data collection level which specifies the amount of data that is reported.
     */
    dataCollectionLevel: DataCollectionLevel;


    /**
     * opt-in value for crash reporting.
     */
    crashReportingOptedIn: boolean;
}

declare var dynatraceMobile: DynatraceMobile;

