function HeaderIconContainer({ children, value }: any) {
  return (
    <div
      style={{
        position: 'relative',
        cursor: 'pointer',
        marginTop: 1
      }}
    >
      {children}
      <div
        style={{
          display: value ? 'flex' : 'none',
          position: 'absolute',
          color: 'black',
          flexDirection: 'row',
          alignItems: 'center'
        }}
        className="bell"
      >
        <p className="numero">
          {value}
        </p>
      </div>
    </div>
  );
}

export default HeaderIconContainer;
