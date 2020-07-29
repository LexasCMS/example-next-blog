export default function Layout({ children }) {
  return (
    <>
      <div className="p-4">
        <div className="flex items-center justify-center max-w-screen-lg mx-auto bg-gray-900 text-sm leading-5 text-gray-300 px-4 py-3 rounded shadow">
          <span>
            This is a blog example built with <a href="https://www.lexascms.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-100">LexasCMS</a> and <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-100">Next.js</a>
            &nbsp;-&nbsp;
            <a href="https://github.com/lexascms/example-next-blog/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-100">View source code</a>
          </span>
        </div>
      </div>

      <div className="px-5">
        <div className="max-w-screen-lg mx-auto py-16">
          {children}
        </div>
      </div>
    </>
  )
}
