/*
(c) 2023 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const initPageTime = performance.now();

const asyncWindow = new Promise(function (resolve, reject) {
  window.addEventListener("load", function (evt) {
    resolve(evt);
  });
});

(async function () {
  try {
    const modules = await Promise.all( [ asyncWindow ] );
    start(modules);
  } catch (e) {
    console.error(e);
    throw e;
  }
})();

async function start( [ evtWindow ] ) {
  try {
    async function getPermission() {
      let permission = await Notification.permission;
      if (permission === "granted") {
        return;
      }
      const startBtn = document.createElement("button");
      document.body.appendChild(startBtn);
      startBtn.appendChild(document.createTextNode("Click here to start"));
      await new Promise(function (resolve, reject) {
        startBtn.addEventListener("click", function (evt) {
          (async function () {
            permission = await Notification.requestPermission();
            if (permission === "granted") {
              startBtn.remove();
              resolve();
            } else {
              self.alert("Permission is required to use this app.");
            }
          })();
        });
      });
    }
    (async function () {
      const arrNotifications = [];
      await getPermission();
      const tblImages = document.createElement("table");
      document.body.appendChild(tblImages);
      const btnAddImage = document.createElement("table");
      const selBadge = document.createElement("select");
      const inpBody = document.createElement("input");
      const selIcon = document.createElement("select");
      const selImage = document.createElement("select");
      const chkRenotify = document.createElement("input");
      const chkRequireInteraction = document.createElement("input");
      const chkSilent = document.createElement("input");
      const inpTag = document.createElement("input");
      const inpTimestamp = document.createElement("input");
      const selVibrate = document.createElement("select");
      const btnTriggerNotification = document.createElement("table");
      const tblNotifications = document.createElement("table");
      btnTriggerNotification.addEventListener("click", function () {
        const thisNotification = new Notification(inpTitle.value, {
          actions: [],
          badge: selBadge.value,
          body: inpBody.value,
          data: null,
          dir: "auto",
          icon: selIcon.value,
          image: selIcon.value,
          lang: "en",
          renotify: chkRenotify.value,
          requireInteraction: chkRequireInteraction.value,
          silent: chkSilent.value,
          tag: inpTag.value,
          timestamp: inpTimestamp.value,
          vibrate: selVibrate.value,
        });
        arrNotifications.push(thisNotification);
        thisNotification.addEventListener("click", function (evt) {});
        thisNotification.addEventListener("close", function (evt) {});
        thisNotification.addEventListener("error", function (evt) {});
        thisNotification.addEventListener("show", function (evt) {});
      });
/*
actions
    An array of actions to display in the notification. Each element in the array is an object with the following members:
        action (string): A string identifying a user action to be displayed on the notification.
        title (string): A string containing action text to be shown to the user.
        icon (image URL): A string containing the URL of an icon to display with the action.
    Appropriate responses are built using event.action within the notificationclick event.
badge (image URL)
    A string containing the URL of the image used to represent the notification when there isn't enough space to display the notification itself.
body (string)
    A string representing the body text of the notification, which is displayed below the title.
data
    Arbitrary data that you want associated with the notification. This can be of any data type.
dir ("auto", "rtl", "ltr")
    The direction in which to display the notification. It defaults to auto, which just adopts the browser's language setting behavior, but you can override that behavior by setting values of ltr and rtl (although most browsers seem to ignore these settings.)
icon (image URL)
    A string containing the URL of an icon to be displayed in the notification.
image (image URL)
    a string containing the URL of an image to be displayed in the notification.
lang
    The notification's language, as specified using a string representing a language tag according to RFC 5646: Tags for Identifying Languages (also known as BCP 47). See the Sitepoint ISO 2 letter language codes page for a simple reference.
renotify (boolean)
    A boolean value specifying whether the user should be notified after a new notification replaces an old one. The default is false, which means they won't be notified. If true, then tag also must be set.
requireInteraction (boolean)
    Indicates that a notification should remain active until the user clicks or dismisses it, rather than closing automatically. The default value is false.
silent (boolean)
    A boolean value specifying whether the notification is silent (no sounds or vibrations issued), regardless of the device settings. The default is false, which means it won't be silent. If true, then vibrate must not be present.
tag (string)
    A string representing an identifying tag for the notification. The default is the empty string.
vibrate
    A vibration pattern for the device's vibration hardware to emit with the notification. If specified, silent must not be true.

      
          close()

Events
*/
    })();
  } catch (e) {
    console.log(e);
  }
}
