import { useState } from 'react';
import { Terminal, Server, Code, Copy, Check, Book, Zap, Settings } from 'lucide-react';

interface InstallStep {
  title: string;
  code: string;
  id: string;
}

interface InstallMethod {
  title: string;
  icon: any;
  steps: InstallStep[];
}

interface ObsStep {
  title: string;
  description: string;
  image: string;
  code?: string;
}

interface EnvVariable {
  name: string;
  desc: string;
  default: string;
}

export default function DocsPage() {
  const [copied, setCopied] = useState<string>('');

  const copyToClipboard = (text: string, id: string): void => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  const installMethods: InstallMethod[] = [
    {
      title: "Docker Compose (Recommended)",
      icon: <Server className="w-5 h-5" />,
      steps: [
        {
          title: "Download docker-compose.yml",
          code: "curl -O https://raw.githubusercontent.com/OBSBridge/OBSBridge/main/docker-compose.yml",
          id: "docker-1"
        },
        {
          title: "Configure environment",
          code: `# .env
TURN_SECRET=your-secret-key-here
DOMAIN=yourdomain.com
SSL_EMAIL=you@example.com`,
          id: "docker-2"
        },
        {
          title: "Start the services",
          code: "docker-compose up -d",
          id: "docker-3"
        }
      ]
    },
    {
      title: "NPM Installation",
      icon: <Terminal className="w-5 h-5" />,
      steps: [
        {
          title: "Install the package",
          code: "npm install -g @OBSBridge/server",
          id: "npm-1"
        },
        {
          title: "Configure the server",
          code: "OBSBridge init",
          id: "npm-2"
        },
        {
          title: "Start the server",
          code: "OBSBridge start --port 3000",
          id: "npm-3"
        }
      ]
    },
    {
      title: "Manual Setup",
      icon: <Code className="w-5 h-5" />,
      steps: [
        {
          title: "Clone the repository",
          code: "git clone https://github.com/OBSBridge/OBSBridge.git\ncd OBSBridge",
          id: "manual-1"
        },
        {
          title: "Install dependencies",
          code: "npm install",
          id: "manual-2"
        },
        {
          title: "Build and start",
          code: "npm run build\nnpm start",
          id: "manual-3"
        }
      ]
    }
  ];

  const obsSteps: ObsStep[] = [
    {
      title: "Create a Browser Source",
      description: "In OBS, right-click on your scene and select Add → Browser",
      image: "📺"
    },
    {
      title: "Paste the Stream URL",
      description: "Copy the guest stream URL from OBSBridge and paste it into the URL field",
      code: "https://your-server.com/stream/guest-abc123",
      image: "🔗"
    },
    {
      title: "Configure Source Settings",
      description: "Set width: 1920, height: 1080, and FPS: 30 (or match your stream settings)",
      image: "⚙️"
    },
    {
      title: "Position and Style",
      description: "Resize, position, and add filters to the browser source as needed",
      image: "🎨"
    }
  ];

  const envVariables: EnvVariable[] = [
    { name: "PORT", desc: "Server port", default: "3000" },
    { name: "TURN_SECRET", desc: "TURN server secret", default: "required" },
    { name: "MAX_GUESTS", desc: "Max guests per room", default: "10" },
    { name: "ROOM_TIMEOUT", desc: "Room timeout (minutes)", default: "60" },
    { name: "ENABLE_RECORDING", desc: "Enable server-side recording", default: "false" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Book className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold">OBSBridge Docs</span>
          </div>
          <a href="/" className="text-gray-400 hover:text-gray-100 transition">← Back to Home</a>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-6 border-b border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-6">
            <Zap className="w-4 h-4" />
            Get started in minutes
          </div>
          <h1 className="text-5xl font-bold mb-4">Getting Started</h1>
          <p className="text-xl text-gray-400">
            Self-host OBSBridge on your own infrastructure and start streaming with guests.
          </p>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Quick Start</h2>
          
          <div className="space-y-8">
            {installMethods.map((method, index) => (
              <div key={index} className="p-8 bg-gray-900 border border-gray-800 rounded-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
                    {method.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{method.title}</h3>
                </div>

                <div className="space-y-6">
                  {method.steps.map((step, stepIndex) => (
                    <div key={stepIndex}>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">
                        Step {stepIndex + 1}: {step.title}
                      </h4>
                      <div className="relative">
                        <pre className="p-4 bg-gray-950 border border-gray-800 rounded-lg font-mono text-sm text-gray-300 overflow-x-auto">
{step.code}
                        </pre>
                        <button
                          onClick={() => copyToClipboard(step.code, step.id)}
                          className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
                        >
                          {copied === step.id ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OBS Integration */}
      <section className="py-16 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">OBS Integration</h2>
          <p className="text-gray-400 mb-8">
            Add guest streams to OBS as individual Browser Sources for complete control over layout and positioning.
          </p>

          <div className="grid gap-6">
            {obsSteps.map((step:any, index) => (
              <div key={index} className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{step.image}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-gray-400 mb-3">{step.description}</p>
                    {step.code && (
                      <div className="relative">
                        <pre className="p-3 bg-gray-950 border border-gray-800 rounded-lg font-mono text-sm text-blue-400">
{step.code}
                        </pre>
                        <button
                          onClick={() => copyToClipboard(step.code, `obs-${index}`)}
                          className="absolute top-2 right-2 p-1.5 bg-gray-800 hover:bg-gray-700 rounded transition"
                        >
                          {copied === `obs-${index}` ? (
                            <Check className="w-3 h-3 text-green-400" />
                          ) : (
                            <Copy className="w-3 h-3 text-gray-400" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Configuration */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Configuration</h2>

          <div className="space-y-6">
            <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Environment Variables
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4 pb-3 border-b border-gray-800 font-semibold text-sm text-gray-400">
                  <div>Variable</div>
                  <div>Description</div>
                  <div>Default</div>
                </div>
                {envVariables.map((env, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 py-2 text-sm">
                    <code className="text-blue-400">{env.name}</code>
                    <div className="text-gray-300">{env.desc}</div>
                    <code className="text-gray-500">{env.default}</code>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
              <h3 className="text-xl font-bold mb-4">TURN Server Setup</h3>
              <p className="text-gray-400 mb-4">
                For production deployments, you'll need a TURN server for NAT traversal. We recommend using Coturn.
              </p>
              <div className="relative">
                <pre className="p-4 bg-gray-950 border border-gray-800 rounded-lg font-mono text-sm text-gray-300 overflow-x-auto">
{`# Install Coturn
sudo apt-get install coturn

# Configure /etc/turnserver.conf
listening-port=3478
fingerprint
lt-cred-mech
user=OBSBridge:your-password
realm=yourdomain.com
external-ip=YOUR_PUBLIC_IP`}
                </pre>
                <button
                  onClick={() => copyToClipboard('sudo apt-get install coturn', 'turn-config')}
                  className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
                >
                  {copied === 'turn-config' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Next Steps</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "API Reference", desc: "Explore the REST API", link: "#" },
              { title: "GitHub", desc: "View source code", link: "https://github.com" },
              { title: "Community", desc: "Join Discord", link: "#" }
            ].map((item, index) => (
              <a 
                key={index}
                href={item.link}
                className="p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500/50 transition-all text-center"
              >
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
