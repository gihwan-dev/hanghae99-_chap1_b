/**
 * @description
 * 고비용 연산을 하는 모듈입니다.
 * 삼만개의 _task를 순차적으로 연산합니다.
 */
class HardWork {
  constructor() {
    this._result = 0;
    this._tasks = this._initTasks();
  }

  do() {
    let i = 0;
    let timer = setInterval(() => {
      for (let index = 0; index <= 5; index++) {
        if (i >= this._tasks.length) {
          clearInterval(timer);
          return;
        }
        this._tasks[i]();
        i++;
      }
    }, 50);
  }

  // do() 이외의 메서드는 수정하지마세요
  get result() {
    return this._result;
  }
  _initTasks() {
    const count = 30000;
    const tasks = new Array(count);

    for (let i = 0; i < count; i++) {
      tasks[i] = this._createTask(Math.floor(Math.random() * 3) + 1);
    }

    return tasks;
  }
  _createTask = (n) => () => {
    for (let i = 0; i < 1000; i++) {
      const randnum = Math.random();
      const alpha = Math.floor(randnum * 10) % n;

      if (alpha > 0) {
        this._result += alpha;
      }
    }

    this._sendLog();
  };
  async _sendLog() {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            value: this._result.toFixed(2),
          },
          null,
          2
        ),
      ],
      {
        type: "application/json",
      }
    );

    const res = await blob.text();
    JSON.parse(res);
  }
  //- do() 이외의 메서드는 수정하지마세요
}

// 수정하지마세요
/**
 * @description
 * 로딩 애니메이션을 무한루프로 돌아가도록 합니다.
 */
class Dashboard {
  constructor(work) {
    this._indicatorElement = document.getElementById("indicator");
    this._descriptionElement = document.getElementById("desc");
    this._startTimestamp = 0;
    this._work = work;
  }

  start() {
    this._startTimestamp = Date.now();
    requestAnimationFrame(this._render);
  }

  _render = () => {
    const timestamp = Date.now();
    const percent = (((timestamp - this._startTimestamp) * 5) % 10000) / 100;

    this._indicatorElement.style.setProperty("width", `${percent}%`);
    this._descriptionElement.innerHTML = `업무량: ${this._work.result}`;

    requestAnimationFrame(this._render);
  };
}

async function main() {
  const hardWork = new HardWork();
  const dashboard = new Dashboard(hardWork);

  dashboard.start();
  document.getElementById("btn").addEventListener("click", () => {
    hardWork.do();
  });
}

main();
