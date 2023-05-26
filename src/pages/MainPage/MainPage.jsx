import styles from "./MainPage.module.scss";

import arrowPrevious from "../../assets/icons/arrow_previous.svg";
import arrowNext from "../../assets/icons/arrow_next.svg";
import { useState } from "react";
import {
  citySelected,
  cuisineSelected,
  cityTags,
  cuisineTags,
} from "../../contexts/TagsContext";

function MainPage() {
  const [stepState, setStepState] = useState("city");
  const [isPreviousAvailable, setIsPreviousAvailable] = useState(false);
  const [tagsData, setTagsData] = useState(cityTags);
  const [selectedCity, setSelectedCity] = useState(citySelected);
  const [selectedCuisine, setSelectedCuisine] = useState(cuisineSelected);
  const [cityTagCount, setCityTagCount] = useState(citySelected.length);
  const [cuisineTagCount, setCuisineTagCount] = useState(
    cuisineSelected.length
  );

  // CurrentTagsArea related
  // UI: 當前的city tags
  const currentCityTags = selectedCity.map((city, index) => {
    return <div key={index}>{city}</div>;
  });
  // UI: 當前的cusine tags
  const currentCuisineTags = selectedCuisine.map((cuisine, index) => {
    return <div key={index}>{cuisine}</div>;
  });

  // ChoosingArea related
  // UI: 可選擇的tags list
  const tagList = tagsData.map((topic, index) => {
    return (
      <div
        className={styles.tagList}
        key={index}
        onClick={() => handleTagClick(topic.name)}
      >
        <img src={topic.img} alt="topic tag" />
        <span>{topic.name}</span>
      </div>
    );
  });
  // event: 上一步按鈕
  function handlePreviousStep() {
    setTagsData(cityTags);
    setIsPreviousAvailable(false);
    setStepState("city");
  }
  // event: 下一步按鈕
  function handleNextStep() {
    /////// to製作：如果是在step2，按OK會把下方改顯示按鈕////////////////////////////////

    setTagsData(cuisineTags);
    setIsPreviousAvailable(true);
    setStepState("cuisine");
  }
  // event: tag onClick
  const handleTagClick = (tagClicked) => {
    // Step: 挑選city tags
    if (stepState === "city") {
      // 能將已選擇的city tag移除
      const isCitySelected = selectedCity.includes(tagClicked);
      if (isCitySelected === true) {
        const citySelected = selectedCity.filter((item) => item !== tagClicked);
        setSelectedCity(citySelected);
        setCityTagCount(citySelected.length);
      } else {
        // 如果tag已選擇5個，跳出提示
        if (cityTagCount === 5) {
          alert("you can only choose 5 city tags!");
        } else {
          // 能新增未選擇的city
          const cities = [...selectedCity, tagClicked];
          setSelectedCity(cities);
          setCityTagCount(cities.length);
        }
      }

      // Step: 挑選cuisine tags
    } else if (stepState === "cuisine") {
      // 能將已選擇的cuisine tag移除
      const isCuisineSelected = selectedCuisine.includes(tagClicked);
      if (isCuisineSelected === true) {
        const cuisineSelected = selectedCuisine.filter(
          (item) => item !== tagClicked
        );
        setSelectedCuisine(cuisineSelected);
        setCuisineTagCount(cuisineSelected.length);
      } else {
        // 如果tag已選擇5個，跳出提示
        if (cuisineTagCount === 5) {
          alert("you can only choose 5 cuisine tags!");
        } else {
          const cuisineSelected = [...selectedCuisine, tagClicked];
          setSelectedCuisine(cuisineSelected);
          setCuisineTagCount(cuisineSelected.length);
        }
      }
    }

    // 被點擊後新增暗幕、移除標籤功能
  };

  return (
    <div className={styles.container}>
      <CurrentTagsArea
        currentCityTags={currentCityTags}
        currentCuisineTags={currentCuisineTags}
        cityTagCount={cityTagCount}
        cuisineTagCount={cuisineTagCount}
      />
      <ChoosingArea
        dataList={tagList}
        onPreviousStep={handlePreviousStep}
        onNextStep={handleNextStep}
        isVisible={isPreviousAvailable}
        stepState={stepState}
      />
    </div>
  );
}

function CurrentTagsArea({
  currentCityTags,
  currentCuisineTags,
  cityTagCount,
  cuisineTagCount,
}) {
  return (
    <div className={styles.currentTagsArea}>
      <p>Your current tags:</p>
      <SelectedTags
        title={"city :"}
        tagSource={currentCityTags}
        tagCount={cityTagCount}
      />
      <SelectedTags
        title={"cuisine :"}
        tagSource={currentCuisineTags}
        tagCount={cuisineTagCount}
      />
    </div>
  );
}

function ChoosingArea({
  dataList,
  onPreviousStep,
  onNextStep,
  isVisible,
  stepState,
}) {
  return (
    <div className={styles.choosingArea}>
      <div className={styles.topArea}>
        <p>Choose {stepState} tags:</p>
        <div className={styles.buttonArea}>
          {isVisible && (
            <div className={styles.previousBtn} onClick={onPreviousStep}>
              <img src={arrowPrevious} alt="<" />
            </div>
          )}
          <div className={styles.okBtn} onClick={onNextStep}>
            OK <img src={arrowNext} alt=">" />
          </div>
        </div>
      </div>
      <div className={styles.pictureTagsArea}>{dataList}</div>
    </div>
  );
}

function SelectedTags({ title, tagSource, tagCount }) {
  return (
    <div className={styles.selectedTags}>
      <div className={styles.texts}>
        {title}
        <p>{tagCount}/5</p>
      </div>
      <div className={styles.tags}>{tagSource}</div>
    </div>
  );
}

export default MainPage;
