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
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const imgRef = useRef() as MutableRefObject<HTMLImageElement>;
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

    event.preventDefault();

    const containerRefCurrent = containerRef.current as HTMLElement;
    const containerRefCurrentChild = containerRefCurrent.children[0] as HTMLElement;
    const imgRefCurrent = imgRef.current as HTMLElement;

    let objectPositionX: number = currentDisplayPositionX;
    let objectPositionY: number = currentDisplayPositionY;


    if (event.movementX + currentDisplayPositionX < 0
      && event.movementX + currentDisplayPositionX > imgRefCurrent.naturalWidth * -1 + 512
    ) {
      objectPositionX = event.movementX + currentDisplayPositionX;
      if (markersLength) containerRefCurrentChild.style.left = `${markerCurrentPositionX + event.movementX - MARKERMARGINX}px`;
    }
    if (event.movementY + currentDisplayPositionY < 0
      && event.movementY + currentDisplayPositionY > imgRefCurrent.naturalHeight * -1 + 384
    ) {
      objectPositionY = event.movementY + currentDisplayPositionY;
      if (markersLength) containerRefCurrentChild.style.top = `${markerCurrentPositionY + event.movementY - MARKERMARGINY}px`;
    }

    imgRefCurrent.style.objectPosition = `${objectPositionX}px ${objectPositionY}px`

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
    if (!containerRef || !containerRef.current) return;

    const containerRefCurrent = containerRef.current as HTMLElement;

    if (!DOMAccessed) {
      containerRefCurrent.addEventListener('mousedown', () => { mousedownHandler(); });
      containerRefCurrent.addEventListener('mousemove', (event: MouseEvent) => { mousemoveHandler(event); });
      containerRefCurrent.addEventListener('mouseup', () => { mouseupHandler(); });
      containerRefCurrent.addEventListener('contextmenu', (event: MouseEvent) => { contextmenuHandler(event); });
      containerRefCurrent.addEventListener('mouseleave', () => { mouseleaveHandler(); });
    }

    DOMAccessed = true;

    return () => {
      containerRefCurrent.removeEventListener('contextmenu', contextmenuHandler);
      containerRefCurrent.removeEventListener('mousemove', mousemoveHandler);
      containerRefCurrent.removeEventListener('mouseup', mouseupHandler);
      containerRefCurrent.removeEventListener('contextmenu', contextmenuHandler);
      containerRefCurrent.removeEventListener('mouseleave', mouseleaveHandler);
    }
  }, [containerRef, imgRef, isMouseClicked]);

  return (
    <div className="container">
      <Head>
        <title>mapSample</title>
      </Head>
      <div ref={containerRef} className="image-container">
        <img ref={imgRef} src={"/images/map.png"} className="image-element" width={'1024px'} height={'768px'} style={{ objectPosition: '1px 1px' }} />
        {markersState}
      </div>
      <img src={"/images/reset.png"} className="reset-button" onClick={() => {resetHandler()}} />
    </div>
  )
}
