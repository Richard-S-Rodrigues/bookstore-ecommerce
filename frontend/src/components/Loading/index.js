import ReactLoading from "react-loading";

export const LoadingBig = () => (
	<div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
		<ReactLoading  type="spin" color={"var(--light-blue)"} height={'10em'} width={'10em'} />
	</div>
); 

export const LoadingSmall = () => (
	<div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
		<ReactLoading  type="spin" color={"var(--light-blue)"} height={'5em'} width={'5em'} />
	</div>
)