import anime from "animejs/lib/anime.es.js";
import { useEffect, useRef, useState } from "react";
import PageNav from "../components/PageNav";
import { useCities } from "../contexts/CitiesContext";
import Message from "../components/Message";
import User from "../components/User";
import Descretion from "../components/Descretion";

function Memories() {
  const [isLoading, setIsLoading] = useState(true);
  const [cityArr, setCityArr] = useState([]);
  const { cities } = useCities();
  useEffect(
    function () {
      setCityArr(cities.map((city) => city.cityName));
      if (cities) setIsLoading(false);
    },
    [cities]
  );
  // const { getJson } = require("serpapi");

  // getJson(
  //   {
  //     engine: "google_images",
  //     q: "Coffee",
  //     location: "Austin, TX, Texas, United States",
  //     api_key:
  //       "095bff0d7f54183b9ca552c9964f91b4499a0127356a9dcbbca3d1708d2c538e",
  //   },
  //   (json) => {
  //     console.log(json);
  //   }
  // );
  // useEffect(
  //   function () {
  //     setIsLoading(true);
  //     async function getImages(city) {
  //       try {
  //         const res = await fetch(
  //           // `https://serpapi.com/search.json?engine=google_images&q=${city}&api_key=${
  //           //   import.meta.env.VITE_serpAPIkey
  //           // }`
  //           `https://serpapi.com/search?engine=google&q=Coffee&api_key=
  //             095bff0d7f54183b9ca552c9964f91b4499a0127356a9dcbbca3d1708d2c538e
  //           `,
  //           // `https://serpapi.com/search.json?engine=google_images&q=$pune&api_key=
  //           //   095bff0d7f54183b9ca552c9964f91b4499a0127356a9dcbbca3d1708d2c538e/images_results
  //           // `,
  //           { mode: "no-cors" }
  //         );
  //         const data = res.json();
  //         console.log(data);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //     // cityArr.forEach((city) => getImages(city));
  //     getImages();
  //     setIsLoading(false);
  //   },
  //   [cityArr]
  // );
  useEffect(
    function init() {
      if (isLoading) return;
      setTimeout(function () {
        const slider = document.querySelector(".slider");
        const nextBtn = slider.querySelector(".slider .nav .next");
        const prevBtn = slider.querySelector(".slider .nav .prev");
        const items = slider.querySelectorAll(".slider .item");

        let current = 0;

        items.forEach((item) => {
          const textWrapper = item.querySelector(".wrap");
          textWrapper.innerHTML = textWrapper.textContent.replace(
            /\S/g,
            "<span class='letter'>$&</span>"
          );
        });

        function anim(current, next, callback) {
          const currentImgs = current.querySelectorAll(".img");
          const currentText = current.querySelectorAll(".content .letter");
          const nextImgs = next.querySelectorAll(".img");
          const nextText = next.querySelectorAll(".content .letter");

          const t = 400;
          const offset = "-=" + t * 0.4;
          const imgOffset = t * 0.8;

          const tl = anime.timeline({
            easing: "easeInOutQuint",
            duration: t,
            complete: callback,
          });

          tl.add({
            targets: currentText,
            translateY: [0, "-.75em"],
            opacity: [1, 0],
            easing: "easeInQuint",
            duration: t,
            delay: (el, i) => 10 * (i + 1),
          })
            .add(
              {
                targets: currentImgs[0],
                translateY: -600,
                translateZ: 0,
                rotate: [0, "-15deg"],
                opacity: [1, 0],
                easing: "easeInCubic",
              },
              offset
            )
            .add(
              {
                targets: currentImgs[1],
                translateY: -600,
                translateZ: 0,
                rotate: [0, "15deg"],
                opacity: [1, 0],
                easing: "easeInCubic",
              },
              "-=" + imgOffset
            )
            .add(
              {
                targets: currentImgs[2],
                translateY: -600,
                translateZ: 0,
                rotate: [0, "-15deg"],
                opacity: [1, 0],
                easing: "easeInCubic",
              },
              "-=" + imgOffset
            )
            .add(
              {
                targets: currentImgs[3],
                translateY: -600,
                translateZ: 0,
                rotate: [0, "15deg"],
                opacity: [1, 0],
                easing: "easeInCubic",
              },
              "-=" + imgOffset
            )
            .add({
              targets: current,
              opacity: 0,
              visibility: "hidden",
              duration: 10,
              easing: "easeInCubic",
            })
            .add(
              {
                targets: next,
                opacity: 1,
                visibility: "visible",
                duration: 10,
              },
              offset
            )
            .add(
              {
                targets: nextImgs[0],
                translateY: [600, 0],
                translateZ: 0,
                rotate: ["15deg", 0],
                opacity: [0, 1],
                easing: "easeOutCubic",
              },
              offset
            )
            .add(
              {
                targets: nextImgs[1],
                translateY: [600, 0],
                translateZ: 0,
                rotate: ["-15deg", 0],
                opacity: [0, 1],
                easing: "easeOutCubic",
              },
              "-=" + imgOffset
            )
            .add(
              {
                targets: nextImgs[2],
                translateY: [600, 0],
                translateZ: 0,
                rotate: ["15deg", 0],
                opacity: [0, 1],
                easing: "easeOutCubic",
              },
              "-=" + imgOffset
            )
            .add(
              {
                targets: nextImgs[3],
                translateY: [600, 0],
                translateZ: 0,
                rotate: ["-15deg", 0],
                opacity: [0, 1],
                easing: "easeOutCubic",
              },
              "-=" + imgOffset
            )
            .add(
              {
                targets: nextText,
                translateY: [".75em", 0],
                translateZ: 0,
                opacity: [0, 1],
                easing: "easeOutQuint",
                duration: t * 1.5,
                delay: (el, i) => 10 * (i + 1),
              },
              offset
            );
        }

        let isPlaying = false;

        function updateSlider(newIndex) {
          const currentItem = items[current];
          const newItem = items[newIndex];

          function callback() {
            currentItem.classList.remove("is-active");
            newItem.classList.add("is-active");
            current = newIndex;
            isPlaying = false;
          }

          anim(currentItem, newItem, callback);
        }

        if (cities.length < 2) return;
        function next() {
          if (isPlaying) return;
          isPlaying = true;
          const newIndex = current === items.length - 1 ? 0 : current + 1;
          updateSlider(newIndex);
        }

        function prev() {
          if (isPlaying) return;
          isPlaying = true;
          const newIndex = current === 0 ? items.length - 1 : current - 1;
          updateSlider(newIndex);
        }

        nextBtn.onclick = next;
        prevBtn.onclick = prev;
      }, 300);
    },
    [cities, isLoading]
  );
  return (
    <main className="memories">
      <PageNav />
      {isLoading ? (
        <Message
          message={
            "First select the cities you travelled from the map by logging in"
          }
        />
      ) : (
        <div>
          <div className="slider">
            <div className="nav">
              <div className="next"></div>
              <div className="prev"></div>
              <div className="explore-btn">Explore</div>
            </div>
            {cityArr.map((city, i) => (
              <div key={i} className={`item ${i === 0 ? "is-active" : ""}`}>
                <div className="content">
                  <div className="wrap">{city}</div>
                </div>
                <div className="imgs">
                  <div className="grid">
                    <div className="img img-1">
                      <img
                        src={`https://picsum.photos/seed/${i + 1}${i}/700/700`}
                      />
                    </div>
                    <div className="img img-2">
                      <img
                        src={`https://picsum.photos/seed/${i}${i + 1}/700/700`}
                      />
                    </div>
                    <div className="img img-3">
                      <img
                        src={`https://picsum.photos/seed/${i}${i + 2}/700/700`}
                      />
                    </div>
                    <div className="img img-4">
                      <img
                        src={`https://picsum.photos/seed/${i + 11}${
                          i + 3
                        }/700/700`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Descretion />
        </div>
      )}
    </main>
  );
}

export default Memories;
