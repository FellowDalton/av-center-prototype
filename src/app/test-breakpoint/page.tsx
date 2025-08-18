"use client";

export default function TestBreakpoint() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Breakpoint Test Page</h1>

      {/* Test with inline styles to verify actual breakpoint values */}
      <style jsx>{`
        @media (min-width: 1220px) {
          .custom-lg-test {
            background: green;
            color: white;
          }
          .custom-lg-test::after {
            content: " - CSS says: lg (1220px+)";
          }
        }
        @media (max-width: 1187px) {
          .custom-lg-test {
            background: red;
            color: white;
          }
          .custom-lg-test::after {
            content: " - CSS says: < lg (under 1220px)";
          }
        }
      `}</style>

      <div className="space-y-4">
        <div className="p-4 border">
          <p className="custom-lg-test p-2">Custom CSS Test</p>
        </div>

        <div className="p-4 border">
          <p className="lg:bg-green-500 lg:text-white bg-red-500 text-white p-2">
            Tailwind lg: test (should be green at 1220px+)
          </p>
        </div>

        <div className="p-4 border">
          <p className="block lg:hidden bg-yellow-500 p-2">
            Visible below lg ({"<"} 1220px)
          </p>
          <p className="hidden lg:block bg-blue-500 text-white p-2">
            Visible at lg+ (1220px+)
          </p>
        </div>
      </div>
    </div>
  );
}
