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
    });
    (async function () {
      await getPermission();
      new Notification("Hello World");
    })();
  } catch (e) {
    console.log(e);
  }
}
