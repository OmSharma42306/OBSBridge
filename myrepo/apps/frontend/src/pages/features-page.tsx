import { useState } from 'react';
import { Video, Users, Layers, Zap, Shield, Code2, Globe, Radio } from 'lucide-react';

interface Feature {
  id: string;
  icon: any;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  demo: Demo;
}

interface Demo {
  type: 'url-list' | 'diagram' | 'obs-preview' | 'stats' | 'code' | 'checklist';
  data?: GuestData[];
  nodes?: DiagramNode[];
  connections?: [number, number][];
  layers?: ObsLayer[];
  metrics?: Metric[];
  code?: string;
  items?: ChecklistItem[];
}

interface GuestData {
  name: string;
  url: string;
}

interface DiagramNode {
  id: number;
  label: string;
  type: 'guest' | 'server' | 'obs';
  x: number;
  y: number;
}

interface ObsLayer {
  name: string;
  type: string;
  z: number;
}

interface Metric {
  label: string;
  value: string;
  unit: string;
}

interface ChecklistItem {
  label: string;
  checked: boolean;
}

export default function FeaturesPage() {
  const [activeDemo, setActiveDemo] = useState<string>('streams');

  const features: Feature[] = [
    {
      id: 'streams',
      icon: <Video className="w-8 h-8" />,
      title: "Individual Stream URLs",
      tagline: "One URL per guest. Full control in OBS.",
      description: "Each guest who joins your room gets their own unique stream URL. Add these as Browser Sources in OBS and position, resize, or apply filters independently. No forced layouts, no compromises.",
      benefits: [
        "Unique stream URL per guest",
        "Direct WebRTC connection (no screen capture)",
        "1920x1080 @ 30fps (configurable)",
        "Sub-second latency",
        "Add as OBS Browser Source"
      ],
      demo: {
        type: 'url-list',
        data: [
          { name: "Guest 1 - Alex", url: "https://stream.link/room/abc123/guest-1" },
          { name: "Guest 2 - Jordan", url: "https://stream.link/room/abc123/guest-2" },
          { name: "Guest 3 - Casey", url: "https://stream.link/room/abc123/guest-3" }
        ]
      }
    },
    {
      id: 'webrtc',
      icon: <Zap className="w-8 h-8" />,
      title: "Low-Latency WebRTC",
      tagline: "Real-time communication. Sub-second latency.",
      description: "Built on WebRTC with a Selective Forwarding Unit (SFU) architecture. Guests connect peer-to-peer through your server, ensuring minimal latency and high-quality streams.",
      benefits: [
        "Selective Forwarding Unit (SFU)",
        "Automatic bitrate adaptation",
        "Echo cancellation & noise suppression",
        "Network resilience with ICE/STUN/TURN",
        "Works behind NATs and firewalls"
      ],
      demo: {
        type: 'diagram',
        nodes: [
          { id: 1, label: 'Guest 1', type: 'guest', x: 20, y: 20 },
          { id: 2, label: 'Guest 2', type: 'guest', x: 20, y: 60 },
          { id: 3, label: 'SFU Server', type: 'server', x: 50, y: 40 },
          { id: 4, label: 'OBS Studio', type: 'obs', x: 80, y: 40 }
        ],
        connections: [[1, 3], [2, 3], [3, 4]]
      }
    },
    {
      id: 'obs',
      icon: <Layers className="w-8 h-8" />,
      title: "OBS-Native Workflow",
      tagline: "Stay in OBS. Never leave your comfort zone.",
      description: "No external apps, no forced layouts, no compromises. OBSBridge is designed to integrate seamlessly with OBS Studio, the tool you already know and love.",
      benefits: [
        "Browser Sources for each guest",
        "Full scene composition control",
        "Apply filters, transitions, effects",
        "Mix with graphics, overlays, alerts",
        "Stream to any RTMP platform"
      ],
      demo: {
        type: 'obs-preview',
        layers: [
          { name: "Background", type: "image", z: 1 },
          { name: "Guest 1 Stream", type: "browser", z: 2 },
          { name: "Guest 2 Stream", type: "browser", z: 3 },
          { name: "Lower Third", type: "text", z: 4 }
        ]
      }
    },
    {
      id: 'scalable',
      icon: <Users className="w-8 h-8" />,
      title: "Scalable Architecture",
      tagline: "From 2 to 20+ guests. Scales with your needs.",
      description: "Built to handle multiple guests efficiently. The SFU architecture ensures that adding more guests doesn't exponentially increase bandwidth requirements.",
      benefits: [
        "Up to 20+ guests per room",
        "Linear bandwidth scaling",
        "Automatic quality adjustment",
        "Server-side recording (optional)",
        "Room persistence & reconnection"
      ],
      demo: {
        type: 'stats',
        metrics: [
          { label: "Max Guests", value: "20+", unit: "guests" },
          { label: "Typical Latency", value: "~200", unit: "ms" },
          { label: "Video Quality", value: "1080p", unit: "30fps" },
          { label: "Bandwidth/Guest", value: "~2", unit: "Mbps" }
        ]
      }
    },
    {
      id: 'opensource',
      icon: <Code2 className="w-8 h-8" />,
      title: "Open Source & Self-Hostable",
      tagline: "Your infrastructure. Your rules. Your data.",
      description: "No vendor lock-in, no black boxes. Deploy on your own servers, customize the code, and keep complete control over your streaming infrastructure.",
      benefits: [
        "MIT licensed source code",
        "Docker & npm packages available",
        "Full API documentation",
        "Active community development",
        "Deploy on any VPS or cloud"
      ],
      demo: {
        type: 'code',
        code: `# Deploy with Docker Compose
docker-compose up -d

# Or install with npm
npm install -g @OBSBridge/server
OBSBridge start

# Customize the source
git clone https://github.com/OmSharma42306/OBSBridge
cd OBSBridge && npm install
# Edit, build, deploy`
      }
    },
    {
      id: 'privacy',
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy-First Design",
      tagline: "No account linking. No data mining.",
      description: "OBSBridge doesn't require guests or hosts to link their YouTube or Twitch accounts. No tracking, no analytics, no third-party integrations unless you choose to add them.",
      benefits: [
        "No account linking required",
        "No tracking or analytics by default",
        "Guest links expire after use",
        "Optional password protection",
        "GDPR/CCPA friendly"
      ],
      demo: {
        type: 'checklist',
        items: [
          { label: "No email required", checked: true },
          { label: "No OAuth flows", checked: true },
          { label: "No data retention", checked: true },
          { label: "No tracking cookies", checked: true },
          { label: "End-to-end encrypted (DTLS)", checked: true }
        ]
      }
    }
  ];

  const activeFeature = features.find(f => f.id === activeDemo);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Radio className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold">OBSBridge Features</span>
          </div>
          <a href="/" className="text-gray-400 hover:text-gray-100 transition">← Back to Home</a>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-6 border-b border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Everything You Need for
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Professional Guest Streaming
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Built for creators who demand control, powered by open-source WebRTC technology.
          </p>
        </div>
      </section>

      {/* Feature Navigation */}
      <section className="py-8 px-6 bg-gray-900/50 sticky top-[73px] z-40 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveDemo(feature.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeDemo === feature.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-750 hover:text-gray-200'
                }`}
              >
                <div className="w-5 h-5">{feature.icon}</div>
                {feature.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Feature Detail */}
      {activeFeature && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left: Description */}
              <div>
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-blue-400">
                    {activeFeature.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{activeFeature.title}</h2>
                    <p className="text-blue-400 text-sm">{activeFeature.tagline}</p>
                  </div>
                </div>

                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  {activeFeature.description}
                </p>

                <h3 className="text-xl font-bold mb-4">Key Benefits</h3>
                <ul className="space-y-3">
                  {activeFeature.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      </div>
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Demo */}
              <div className="lg:sticky lg:top-32">
                <div className="p-8 bg-gray-900 border border-gray-800 rounded-2xl">
                  {activeFeature.demo.type === 'url-list' && activeFeature.demo.data && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4 text-gray-400">Guest Stream URLs</h3>
                      {activeFeature.demo.data.map((guest, index) => (
                        <div key={index} className="p-4 bg-gray-950 border border-gray-800 rounded-lg">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                              {guest.name.charAt(0)}
                            </div>
                            <span className="font-semibold">{guest.name}</span>
                          </div>
                          <code className="text-xs text-blue-400 block break-all bg-gray-900 p-2 rounded">
                            {guest.url}
                          </code>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeFeature.demo.type === 'diagram' && activeFeature.demo.nodes && activeFeature.demo.connections && (
                    <div className="relative h-64">
                      <svg className="w-full h-full">
                        {activeFeature.demo.connections.map((conn, index) => {
                          const start = activeFeature.demo.nodes!.find(n => n.id === conn[0]);
                          const end = activeFeature.demo.nodes!.find(n => n.id === conn[1]);
                          if (!start || !end) return null;
                          return (
                            <line
                              key={index}
                              x1={`${start.x}%`}
                              y1={`${start.y}%`}
                              x2={`${end.x}%`}
                              y2={`${end.y}%`}
                              stroke="#3b82f6"
                              strokeWidth="2"
                              strokeDasharray="5,5"
                              opacity="0.5"
                            />
                          );
                        })}
                      </svg>
                      {activeFeature.demo.nodes.map((node) => (
                        <div
                          key={node.id}
                          className="absolute"
                          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                        >
                          <div className={`p-4 rounded-lg border text-center min-w-[100px] ${
                            node.type === 'server' 
                              ? 'bg-blue-500/20 border-blue-500/50' 
                              : node.type === 'obs'
                              ? 'bg-purple-500/20 border-purple-500/50'
                              : 'bg-green-500/20 border-green-500/50'
                          }`}>
                            <div className="text-sm font-semibold">{node.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeFeature.demo.type === 'obs-preview' && activeFeature.demo.layers && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold mb-4 text-gray-400">OBS Scene Layers</h3>
                      {activeFeature.demo.layers.map((layer, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-950 border border-gray-800 rounded-lg">
                          <div className="flex items-center gap-2 flex-1">
                            <Layers className="w-4 h-4 text-gray-500" />
                            <span className="font-mono text-sm">{layer.name}</span>
                          </div>
                          <span className="text-xs px-2 py-1 bg-gray-800 rounded text-gray-400">
                            {layer.type}
                          </span>
                          <span className="text-xs text-gray-600">z: {layer.z}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeFeature.demo.type === 'stats' && activeFeature.demo.metrics && (
                    <div className="grid grid-cols-2 gap-4">
                      {activeFeature.demo.metrics.map((metric, index) => (
                        <div key={index} className="p-4 bg-gray-950 border border-gray-800 rounded-lg text-center">
                          <div className="text-3xl font-bold text-blue-400 mb-1">
                            {metric.value}
                          </div>
                          <div className="text-xs text-gray-500 mb-1">{metric.unit}</div>
                          <div className="text-sm text-gray-400">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeFeature.demo.type === 'code' && activeFeature.demo.code && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-400">Quick Deploy</h3>
                      <pre className="p-4 bg-gray-950 border border-gray-800 rounded-lg text-sm text-gray-300 overflow-x-auto font-mono">
{activeFeature.demo.code}
                      </pre>
                    </div>
                  )}

                  {activeFeature.demo.type === 'checklist' && activeFeature.demo.items && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold mb-4 text-gray-400">Privacy Features</h3>
                      {activeFeature.demo.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-950 border border-gray-800 rounded-lg">
                          <div className={`w-5 h-5 rounded flex items-center justify-center ${
                            item.checked ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-600'
                          }`}>
                            {item.checked && '✓'}
                          </div>
                          <span className="text-gray-300">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-y border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Deploy OBSBridge in minutes and start streaming with guests.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/docs" 
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              View Documentation
            </a>
            <a 
              href="https://github.com" 
              className="flex items-center gap-2 px-8 py-4 bg-gray-800 border border-gray-700 rounded-lg font-semibold hover:bg-gray-750 transition"
            >
              <Globe className="w-5 h-5" />
              Explore on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
