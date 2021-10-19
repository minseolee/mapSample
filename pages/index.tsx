import Head from 'next/head'
import {MutableRefObject, useEffect, useRef, useState} from "react";

const MARKERMARGINX: number = 50; // for better marker position Accuracy
const MARKERMARGINY: number = 118;

let isMouseClicked: boolean = false;  // flag for drag

let currentDisplayPositionX: number = 0;
let currentDisplayPositionY: number = 0;

let markerCurrentPositionX: number = 0;
let markerCurrentPositionY: number = 0;

let markersLength: number = 0;

let DOMAccessed: boolean = false;

export default function Main() {
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [markersState, setMarkersState] = useState([<></>]);
  const markersArray: Array<JSX.Element> = [];

  function contextmenuHandler(event: MouseEvent): void {
    event.preventDefault();

    markerCurrentPositionX = event.clientX;
    markerCurrentPositionY = event.clientY;

    markersLength += 1;
    setMarkersState(() =>
      [<img
      src={"/images/marker.png"}
      style={{top: event.clientY - MARKERMARGINY, left: event.clientX - MARKERMARGINX}}
      className="markers"
      key={Math.random()}
      draggable={false}
      />]
    );
  }

  function mousedownHandler(): void {
    isMouseClicked = true;
  }

  function mousemoveHandler(event: MouseEvent): void {
    if (!isMouseClicked) return;

    const mapRefCurrent = mapRef.current as HTMLElement;
    const mapRefCurrentChild = mapRefCurrent.children[0] as HTMLElement;

    if (event.movementX + currentDisplayPositionX < 0) {
      mapRefCurrent.style.backgroundPositionX = `${event.movementX + currentDisplayPositionX}px`;
      if (markersLength) mapRefCurrentChild.style.left = `${markerCurrentPositionX + event.movementX - MARKERMARGINX}px`;
    }
    if (event.movementY + currentDisplayPositionY < 0) {
      mapRefCurrent.style.backgroundPositionY = `${event.movementY + currentDisplayPositionY}px`;
      if (markersLength) mapRefCurrentChild.style.top = `${markerCurrentPositionY + event.movementY - MARKERMARGINY}px`;
    }

    currentDisplayPositionX += event.movementX;
    currentDisplayPositionY += event.movementY;

    markerCurrentPositionX += event.movementX;
    markerCurrentPositionY += event.movementY;
  }

  function mouseupHandler(): void {
    isMouseClicked = false;
  }

  function mouseleaveHandler(): void {
    isMouseClicked = false;
  }

  function resetHandler(): void {
    setMarkersState(() => [<></>]);

    for (let i = 0; i < markersLength; i += 1) {
      markersArray.pop();
    }

    markersLength = 0;

    markerCurrentPositionX = 0;
    markerCurrentPositionY = 0;
  }

  useEffect(() => {
    if (!mapRef || !mapRef.current) return;

    const mapRefCurrent = mapRef.current as HTMLElement;

    if (!DOMAccessed) {
      mapRefCurrent.addEventListener('mousedown', () => { mousedownHandler(); });
      mapRefCurrent.addEventListener('mousemove', (event: MouseEvent) => { mousemoveHandler(event); });
      mapRefCurrent.addEventListener('mouseup', () => { mouseupHandler(); });
      mapRefCurrent.addEventListener('contextmenu', (event: MouseEvent) => { contextmenuHandler(event); });
      mapRefCurrent.addEventListener('mouseleave', () => { mouseleaveHandler(); });
    }

    DOMAccessed = true;

    return () => {
      mapRefCurrent.removeEventListener('contextmenu', contextmenuHandler);
      mapRefCurrent.removeEventListener('mousemove', mousemoveHandler);
      mapRefCurrent.removeEventListener('mouseup', mouseupHandler);
      mapRefCurrent.removeEventListener('contextmenu', contextmenuHandler);
      mapRefCurrent.removeEventListener('mouseleave', mouseleaveHandler);
    }
  }, [mapRef, isMouseClicked]);

  return (
    <div className="container">
      <Head>
        <title>mapSample</title>
      </Head>
      <div ref={mapRef} className="image-container" style={{ backgroundPosition: '0 0' }} >
        {markersState}
      </div>
      <img src={"/images/reset.png"} className="reset-button" onClick={() => {resetHandler()}} />
    </div>
  )
}
