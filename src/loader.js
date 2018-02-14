const version = process.env.VERSION

const styles = document.createElement("link")
styles.rel = "stylesheet"
styles.type = "text/css"
styles.href = "app.css?v=" + encodeURIComponent(version)
document.head.appendChild(styles)

const script = document.createElement("script")
script.type = "text/javascript"
script.src = "app.js?v=" + encodeURIComponent(version)
document.head.appendChild(script)