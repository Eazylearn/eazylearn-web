function BackgroundGradient() {
  return (
    <div
      style={{
        zIndex: -1,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(25.8% 51.02% at 77.5% 71.09%, rgba(49, 133, 252, 0.12) 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(19.9% 17.2% at 25.8% 26.76%, #E7F1FF 0%, #FFFFFF 100%)",
      }}
    />
  );
}

export default BackgroundGradient;
