import React from "react";
import styles from "./CheckBox.module.css";

const CheckBox = (props) => {

  return (
    <div className={styles.checkBoxMainWrapper}>
      <div>
        <input
        onClick={props.allCheck}
        checked={props.allChecked}
        onChange={props.changed}
        type="checkbox" id="streamProviders" name="all" />
        <label htmlFor="all">All</label>
      </div>
      <div>
        <input onChange={props.clickedNetflix}
        checked={props.netFlixCheck}
        type="checkBox" id="streamProviders" name="netflix"  />
        <label htmlFor="netflix">Netflix</label>
      </div>

      <div>
        <input onChange={props.clickedPrimeVideo}
        checked={props.primeVideoChecked}
        type="checkBox" id="streamProviders" name="primeVideo" />
        <label htmlFor="primeVideo">Prime Video</label>
      </div>

      <div>
        <input onChange={props.clickedAppleTv}
        checked={props.appleTvChecked}
         type="checkBox" id="streamProviders" name="appletv" />
        <label htmlFor="appletv">Apple TV</label>
      </div>

      <div>
        <input onChange={props.clickedHuluCheck}
        checked={props.huluChecked}
        type="checkBox" id="streamProviders" name="hulu" />
        <label htmlFor="hulu">Hulu</label>
      </div>

      <div>
        <input onChange={props.clickedHboMaxCheck}
        checked={props.hboMaxChecked}
        type="checkBox" id="streamProviders" name="hboMax" />
        <label htmlFor="hboMax">HBO Max</label>
      </div>

      <div>
        <input onChange={props.clickedPeacockCheck}
        checked={props.peacockChecked}
        type="checkBox" id="streamProviders" name="peacock" />
        <label htmlFor="peacock">Peacock</label>
      </div>

      <div>
        <input onChange={props.clickedDiscoveryCheck}
        checked={props.discoveryChecked} 
        type="checkBox" id="streamProviders" name="Discovery" />
        <label htmlFor="discovery">Discovery+</label>
      </div>
    </div>
  );
};

export default CheckBox;
